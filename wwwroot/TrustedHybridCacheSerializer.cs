using System.ComponentModel.DataAnnotations;
using System.Reflection;
using System.Runtime.ExceptionServices;
using MessagePack;
using Microsoft.Extensions.Caching.Hybrid;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Infrastructure.HybridCache;

// Umbraco 17 (HybridCache) version of the TrustedNuCacheSerializer workaround.
//
// Umbraco deserializes cached content with MessagePackSecurity.UntrustedData, which caps decompressed
// payloads at 64MB. In v17 this happens in two places:
//   1. MsgPackContentNestedDataSerializer - reads the cmsContentNu rows in the database.
//   2. HybridCacheSerializer             - reads ContentCacheNode entries from the HybridCache.
// Both keep the options in a private "_options" field, which is patched here to the cap configured in
// appsettings.json. All other UntrustedData protections are kept.
//
// IContentCacheDataSerializerFactory is internal in v17, so it can't be implemented directly as in v13.
// Instead the existing registration is wrapped in a DispatchProxy that patches every serializer it creates.
//
// Configuration (appsettings.json):
//   "TrustedHybridCache": {
//     "MaximumDecompressedSizeMB": 256
//   }
// When the section or value is missing or blank, the MessagePack default of 64MB is kept.
// If a distributed (L2) cache such as Redis is used, keep it private - the cap protects against
// decompression bombs written to the cache.

public sealed class TrustedHybridCacheOptions
{
    public const string SectionName = "TrustedHybridCache";

    public const int DefaultMaximumDecompressedSizeMB = 64;

    /// <summary>
    ///     Maximum decompressed size of a single cache entry, in megabytes. Must be between 1 and 2047.
    ///     When left blank, the MessagePack default of 64MB is used.
    /// </summary>
    [Range(1, int.MaxValue / (1024 * 1024))]
    public int? MaximumDecompressedSizeMB { get; set; }

    internal int MaximumDecompressedSizeBytes => (MaximumDecompressedSizeMB ?? DefaultMaximumDecompressedSizeMB) * 1024 * 1024;
}

internal static class TrustedMessagePackOptions
{
    public static bool TrySetDecompressionLimit(object serializer, int maximumDecompressedSize)
    {
        FieldInfo? field = serializer.GetType().GetField("_options", BindingFlags.Instance | BindingFlags.NonPublic);
        if (field?.GetValue(serializer) is not MessagePackSerializerOptions opts)
        {
            return false;
        }

        field.SetValue(serializer, opts.WithSecurity(opts.Security.WithMaximumDecompressedSize(maximumDecompressedSize)));
        return true;
    }
}

public class TrustedContentCacheDataSerializerFactoryProxy : DispatchProxy
{
    internal object Inner { get; set; } = null!;

    internal int MaximumDecompressedSize { get; set; }

    internal ILogger Logger { get; set; } = null!;

    protected override object? Invoke(MethodInfo? targetMethod, object?[]? args)
    {
        object? result;
        try
        {
            result = targetMethod!.Invoke(Inner, args);
        }
        catch (TargetInvocationException ex) when (ex.InnerException is not null)
        {
            ExceptionDispatchInfo.Capture(ex.InnerException).Throw();
            throw;
        }

        // Only the MessagePack serializer needs patching - the JSON serializer has no decompression cap.
        if (targetMethod.Name == "Create"
            && result is not null
            && result.GetType().Name.StartsWith("MsgPack", StringComparison.Ordinal)
            && TrustedMessagePackOptions.TrySetDecompressionLimit(result, MaximumDecompressedSize) is false)
        {
            Logger.LogWarning(
                "TrustedHybridCacheSerializerComposer could not patch the '_options' field on {SerializerType}. " +
                "The 64MB MessagePack decompression cap is still in effect. Re-verify this workaround after CMS upgrades.",
                result.GetType().FullName);
        }

        return result;
    }
}

public sealed class TrustedHybridCacheSerializerComposer : IComposer
{
    private const string FactoryInterfaceName =
        "Umbraco.Cms.Infrastructure.HybridCache.Serialization.IContentCacheDataSerializerFactory";

    public void Compose(IUmbracoBuilder builder)
    {
        builder.Services.AddOptions<TrustedHybridCacheOptions>()
            .Bind(builder.Config.GetSection(TrustedHybridCacheOptions.SectionName))
            .ValidateDataAnnotations()
            .ValidateOnStart();

        // Keep the MessagePack default untouched unless the cap has been configured.
        if (builder.Config.GetSection(TrustedHybridCacheOptions.SectionName).Exists() is false)
        {
            return;
        }

        PatchDatabaseCacheSerializerFactory(builder.Services);
        PatchHybridCacheSerializer(builder.Services);
    }

    private static void PatchDatabaseCacheSerializerFactory(IServiceCollection services)
    {
        ServiceDescriptor? descriptor = services.LastOrDefault(d => d.ServiceType.FullName == FactoryInterfaceName);
        if (descriptor?.ImplementationFactory is not { } originalFactory)
        {
            throw new InvalidOperationException(
                $"TrustedHybridCacheSerializerComposer: no factory registration for {FactoryInterfaceName} found. " +
                "Remove this workaround or update the reflection target after the CMS upgrade.");
        }

        Type factoryInterface = descriptor.ServiceType;
        services.Remove(descriptor);
        services.Add(ServiceDescriptor.Singleton(factoryInterface, sp =>
        {
            object proxy = DispatchProxy.Create(factoryInterface, typeof(TrustedContentCacheDataSerializerFactoryProxy));
            var trusted = (TrustedContentCacheDataSerializerFactoryProxy)proxy;
            trusted.Inner = originalFactory(sp);
            trusted.MaximumDecompressedSize = sp.GetRequiredService<IOptions<TrustedHybridCacheOptions>>().Value.MaximumDecompressedSizeBytes;
            trusted.Logger = sp.GetRequiredService<ILogger<TrustedHybridCacheSerializerComposer>>();
            return proxy;
        }));
    }

    private static void PatchHybridCacheSerializer(IServiceCollection services)
    {
        ServiceDescriptor? descriptor = services.LastOrDefault(d => d.ServiceType == typeof(IHybridCacheSerializer<ContentCacheNode>));
        if (descriptor?.ImplementationType is not { } serializerType)
        {
            throw new InvalidOperationException(
                "TrustedHybridCacheSerializerComposer: no IHybridCacheSerializer<ContentCacheNode> registration found. " +
                "Remove this workaround or update the reflection target after the CMS upgrade.");
        }

        services.Replace(ServiceDescriptor.Singleton<IHybridCacheSerializer<ContentCacheNode>>(sp =>
        {
            var serializer = (IHybridCacheSerializer<ContentCacheNode>)ActivatorUtilities.CreateInstance(sp, serializerType);
            int maximumDecompressedSize = sp.GetRequiredService<IOptions<TrustedHybridCacheOptions>>().Value.MaximumDecompressedSizeBytes;
            if (TrustedMessagePackOptions.TrySetDecompressionLimit(serializer, maximumDecompressedSize) is false)
            {
                sp.GetRequiredService<ILogger<TrustedHybridCacheSerializerComposer>>().LogWarning(
                    "TrustedHybridCacheSerializerComposer could not patch the '_options' field on {SerializerType}. " +
                    "The 64MB MessagePack decompression cap is still in effect. Re-verify this workaround after CMS upgrades.",
                    serializerType.FullName);
            }

            return serializer;
        }));
    }
}
