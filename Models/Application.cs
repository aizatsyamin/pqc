namespace pqc.Models
{
    public class Application
    {
        public int appId { get; set; }
        public string appName { get; set; }
        public string appBusinessUnit { get; set; }
        public string appCritical { get; set; }
        public string appConnection { get; set; }
        public string? appConnectionRemarks { get; set; }
        public string appDeveloper { get; set; }
        public string? appDeveloperRemarks { get; set; }
        public bool appIsWindows { get; set; }
        public bool appIsDatabase { get; set; }
        public bool appIsMiddleware { get; set; }
        public bool appIsMainframe { get; set; }
        public int appDataYears { get; set; }
        public string appDataServer { get; set; }
        public bool appDataDatabase { get; set; }
        public string? appDataDatabaseRemarks { get; set; }
        public int protocalId { get; set; }
        public string? appProtocalRemarks { get; set; }
        public int implementationId { get; set; }
        public string? appImplementationRemarks { get; set; }
        public int pqcRoadmapId { get; set; }
        public int pqcAlgorithmId { get; set; }
        public string? appPqcAlgorithmRemarks { get; set; }
        public int appPqcYears { get; set; }
        public int appPqcQuarter { get; set; }
        public int appPqcCost { get; set; }
        public bool appPqcRegulators { get; set; }
    }
}