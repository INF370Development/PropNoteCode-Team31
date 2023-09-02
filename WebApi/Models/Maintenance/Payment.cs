using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class Payment
    {
        [Key]
        public int PaymentID { get; set; }
        public int MaintenaceID { get; set; }
        public double Amount { get; set; }

    }
}
