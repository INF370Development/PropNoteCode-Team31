using WebApi.Models.Admin;
using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Property
{
    public class Property
    {
        public int PropertyID { get; set; }
        public string Description { get; set; }
        public string BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public int PurchaseAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Size { get; set; }
        public string Yard { get; set; }
        public int BrokerID { get; set; }
        public Broker Broker { get; set; }
    }
}
