using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceNote
    {
        [Key]
        public int MaintenanceNoteID { get; set; }
        public int MaintenanceID { get; set; }
        public string MaintenanceNoteDescription { get; set; }

    }
}
