namespace WebApi.Models.Lease
{
    public class LeaseResponse
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string TenantName { get; set; }
        public string PropertyDescription { get; set; }
    }
}
