using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceNoteViewModel
    {
        public int MaintenaceID { get; set; }
        public string MaintenaceNoteDescription { get; set; }

    }
}
