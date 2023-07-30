using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class Maintenance
    {
        [Key]
        public int MaintenaceID { get; set; }
        public int PropertyID { get; set; }
        public int EmployeeID { get; set; }
        public int ContractorID { get; set; }
        public int MaintenanceStatusID { get; set; }
        public int MaintenanceTypeID { get; set; }
        public DateOnly MaintenanceDate { get; set; }
        public TimeOnly MaintenanceTime { get; set; }

    }
}
