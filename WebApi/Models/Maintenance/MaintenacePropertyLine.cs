using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenancePropertyLine
    {
        [Key]
        public int MaintenacePropertyLineID { get; set; }
        public int MaintenaceID { get; set; }
        public int PropertyID { get; set; }

    }
}
