namespace WebApi.Models.Property
{
    public class Problem
    {
        public int ProblemID { get; set; }
        public int InspectionID { get; set; }
        public int ProblemStatusID { get; set; }
        public string ProblemSubject { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime? ProblemDate { get; set; }
        public string ProblemSeverity { get; set; }

        // Navigation property for the Inspection
        public Inspection Inspection { get; set; }

        // Navigation property for the ProblemStatus
        public ProblemStatus ProblemStatus { get; set; }
    }

    public class ProblemStatus
    {
        public int ProblemStatusID { get; set; }
        public string ProblemStatusName { get; set; }
    }

    public class ProblemRequest
    {
        public int InspectionID { get; set; }
        public int ProblemStatusID { get; set; }
        public string ProblemSubject { get; set; }
        public string ProblemDescription { get; set; }
        public DateTime? ProblemDate { get; set; }
        public string ProblemSeverity { get; set; }

    }

    public class ProblemStatusRequest
    {
        public string ProblemStatusName { get; set; }
    }



}
