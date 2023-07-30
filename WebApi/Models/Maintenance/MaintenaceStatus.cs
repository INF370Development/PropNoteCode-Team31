using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceStatus
    {
        [Key]
        public int MaintenaceStatusID { get; set; }
        public string MaintenaceStatusName { get; set; }

    }
}
