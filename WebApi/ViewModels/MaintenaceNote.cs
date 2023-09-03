using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceNoteViewModel
    {
        public int MaintenanceID { get; set; }
        public string MaintenanceNoteDescription { get; set; }

    }
}
