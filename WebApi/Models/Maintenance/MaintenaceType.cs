using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceType
    {
        [Key]
        public int MaintenanceTypeID { get; set; }
        public string MaintenanceTypeName { get; set; }

    }
}
