namespace WebApi.Models.Property
{
    public class Property
    {
        public int PropertyID { get; set; }
        public string Description { get; set; }
        public int BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public int PurchaseAmount { get; set; }
        public int PurchaseYear { get; set; }
        public string Size { get; set; }
        public string Yard { get; set; }
        public int BrokerID { get; set; }
        public WebApi.Models.Broker.Broker Broker { get; set; }
        
    }

    public class PropertyImage
    {
        public int PropertyImageId { get; set; } // Primary key

        // Other properties
        public string ImageName { get; set; }
        public byte[] ImageData { get; set; }

        // Foreign key
        public int PropertyId { get; set; }
        public Property Property { get; set; }
    }

}
