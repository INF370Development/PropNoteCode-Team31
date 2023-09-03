using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }
        public int MaintenanceID { get; set; }
        public decimal Amount { get; set; }

    }
}
