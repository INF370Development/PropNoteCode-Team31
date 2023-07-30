using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenaceType
    {
        [Key]
        public int MaintenaceTypeID { get; set; }
        public string MaintenaceTypeName { get; set; }

    }
}
