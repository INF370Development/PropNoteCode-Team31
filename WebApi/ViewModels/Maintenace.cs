using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenanceViewModel
    {
        public int PropertyID { get; set; }
        public int EmployeeID { get; set; }
        public int ContractorID { get; set; }
        public int MaintenanceStatusID { get; set; }
        public int MaintenanceTypeID { get; set; }
        public DateTime MaintenanceDate { get; set; }
        public DateTime MaintenanceTime { get; set; }

    }
}
