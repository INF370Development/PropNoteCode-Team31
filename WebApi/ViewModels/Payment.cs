using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class PaymentViewModel
    {
        public int MaintenanceID { get; set; }
        public double Amount { get; set; }

    }
}
