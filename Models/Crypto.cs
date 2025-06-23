namespace pqc.Models
{
    public class Crypto
    {
        public int cryptoId { get; set; }
        public int appId { get; set; }
        public int cryptoTypeId { get; set; }
        public int cryptoUseId { get; set; }
        public string? cryptoUseRemarks { get; set; }
        public int cryptoModeId { get; set; }
        public int cryptoSizeId { get; set; }
        public string? cryptoSizeRemarks { get; set; }
    }

    public class CryptoType
    {
        public int cryptoTypeId { get; set; }
        public string cryptoTypeName { get; set; }
    }

    public class CryptoUseType
    {
        public int cryptoUseId { get; set; }
        public int cryptoTypeId { get; set; }
        public string cryptoUseName { get; set; }
    }
    public class CryptoModeType
    {
        public int cryptoModeId { get; set; }
        public int cryptoTypeId { get; set; }
        public string cryptoModeName { get; set; }
    }

    public class CryptoSizeType
    {
        public int cryptoSizeId { get; set; }
        public int cryptoTypeId { get; set; }
        public string cryptoSizeName { get; set; }
    }
}