using System.ComponentModel.DataAnnotations;

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
        public virtual ICollection<ProblemImage> ProblemImages { get; set; }
        public virtual ICollection<ProblemVideo> ProblemVideos { get; set; }
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

    public class ProblemImage
    {
        public int ProblemImageID { get; set; } // Primary key

        // Other properties
        public string ImageName { get; set; }
        public string ImageData { get; set; }

        // Foreign key
        public int ProblemID { get; set; }
    }

    public class ProblemVideo
    {
        public int ProblemVideoID { get; set; }

        [Required]
        public int ProblemID { get; set; }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(100)]
        public string ContentType { get; set; }

        [Required]
        public string VideoData { get; set; }

        public DateTime UploadDate { get; set; }

        // Navigation property to link to the associated problem
        public Problem Problem { get; set; }
    }

}
