using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceType
    {
        [Key]
        public int MaintenaceTypeID { get; set; }
        public string MaintenaceTypeName { get; set; }

    }
}
