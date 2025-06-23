namespace pqc.Models
{
    public class ProtocalType
    {
        public int protocalId { get; set; }
        public int appId { get; set; }
        public string protocalName { get; set; }
    }

    public class ImplementationType
    {
        public int implementationId { get; set; }
        public string implementationName { get; set; }
    }

    public class PQCRoadmapType
    {
        public int pqcRoadmapId { get; set; }
    }
    
    public class PQCAlgorithmType
    {
        public int pqcAlgorithmId { get; set; }

    }
}