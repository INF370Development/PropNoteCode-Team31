using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenacePropertyLine
    {
        [Key]
        public int MaintenacePropertyLineID { get; set; }
        public int MaintenaceID { get; set; }
        public int PropertyID { get; set; }

    }
}
