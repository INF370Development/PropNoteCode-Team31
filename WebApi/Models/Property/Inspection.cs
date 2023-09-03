namespace WebApi.Models.Property
{
    public class Inspection
    {
        public int InspectionID { get; set; }
        public int? InspectionTypeID { get; set; }
        public int PropertyID { get; set; }
        public int? EmployeeID { get; set; }
        public int? InspectionStatusID { get; set; }
        public string InspectionDescription { get; set; }
        public DateTime InspectionDate { get; set; }
        public TimeSpan InspectionTime { get; set; }

        public InspectionStatus InspectionStatus { get; set; }
        public InspectionType InspectionType { get; set; }
    }

    public class InspectionStatus
    {
        public int InspectionStatusID { get; set; }
        public string InspectionStatusName { get; set; }
    }

    public class InspectionStatusRequest
    {
        public string InspectionStatusName { get; set; }
    }

    public class InspectionType
    {
        public int InspectionTypeID { get; set; }
        public string InspectionTypeName { get; set; }
    }

    public class InspectionTypeRequest
    {
        public string InspectionTypeName { get; set; }
    }

    public class InspectionRequest
    {
        public string InspectionDescription { get; set; }
        public DateTime InspectionDate { get; set; }
        public string InspectionTime { get; set; }
        public int InspectionStatusID { get; set; }
        public int InspectionTypeID { get; set; }
    }

    
}


