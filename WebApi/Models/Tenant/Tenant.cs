namespace WebApi.Models.Tenant
{
    public class Tenant
    {
        public int TenantID { get; set; }
        public int Email { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public string JobTitle { get; set; }
    }
}