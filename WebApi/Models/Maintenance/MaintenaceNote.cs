using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceNote
    {
        [Key]
        public int MaintenaceNoteID { get; set; }
        public int MaintenaceID { get; set; }
        public string MaintenaceNoteDescription { get; set; }

    }
}
