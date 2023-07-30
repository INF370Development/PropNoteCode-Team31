using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenaceNote
    {
        [Key]
        public int MaintenaceNoteID { get; set; }
        public string MaintenaceID { get; set; }
        public string MaintenaceNoteDescription { get; set; }

    }
}
