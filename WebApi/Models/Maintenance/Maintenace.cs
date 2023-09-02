using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class Maintenance
    {
        [Key]
        public int MaintenaceID { get; set; }
        public int PropertyID { get; set; }
        public int ContractorID { get; set; }
        public int MaintenanceStatusID { get; set; }
        public int MaintenanceTypeID { get; set; }
        public DateTime MaintenanceDate { get; set; }
        public DateTime MaintenanceTime { get; set; }

    }
}
