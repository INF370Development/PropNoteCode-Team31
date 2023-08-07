using WebApi.Models;

namespace WebApi.Models.Lease
{
    public class Lease
    {
        public int LeaseID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int MonthlyAmount { get; set; }
        public int TenantID { get; set; }
        public int PropertyID { get; set; }
        public WebApi.Models.Tenant? Tenant { get; set; }
        public WebApi.Models.Property.Property? Property { get; set; }
    }
}
