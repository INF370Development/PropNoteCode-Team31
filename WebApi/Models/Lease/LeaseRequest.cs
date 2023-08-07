namespace WebApi.Models.Lease
{
    public class LeaseRequest
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TenantID { get; set; }
        public int PropertyID { get; set; }
        public int MonthlyAmount { get; set; }
    }
}
