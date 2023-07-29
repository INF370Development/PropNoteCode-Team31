namespace WebApi.Models.Lease
{
    public class LeaseResponse
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int TenantID { get; set; }
        public string PropertyDescription { get; set; }
        public int MonthlyAmount { get; set; }
    }
}
