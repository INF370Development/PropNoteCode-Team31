namespace WebApi.Models
{
    public class Tenant
    {
        public int TenantID { get; set; }
        public string CompanyName { get; set; }
        public int CompanyNumber { get; set; }

        public virtual ICollection<WebApi.Models.Lease.Lease> Leases { get; set; }
    }
}
