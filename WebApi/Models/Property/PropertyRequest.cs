namespace WebApi.Models.Property
{
    public class PropertyRequest
    {
        public string Description { get; set; }
        public int BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public decimal PurchaseAmount { get; set; }
        public int PurchaseYear { get; set; }
        public decimal Size { get; set; }
        public decimal Yard { get; set; }
        public int BrokerID { get; set; }
    }
}
