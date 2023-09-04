using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceStatus
    {
        [Key]
        public int MaintenanceStatusID { get; set; }
        public string MaintenanceStatusName { get; set; }

    }
}
