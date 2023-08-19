namespace WebApi.Models.Broker
{
    public class Broker
    {
        public int BrokerID { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string PhoneNumber { get; set; }
        public string OfficeAddress { get; set; }
        public string LicenseNumber { get; set; }
        public decimal CommissionRate { get; set; }
    }
}
