namespace WebApi.Models.Property
{
    public class Property
    {
        public int PropertyID { get; set; }
        public int? PropertyStatusID {get;set;}
        public string Description { get; set; }
        public int BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public decimal PurchaseAmount { get; set; }
        public int PurchaseYear { get; set; }
        public decimal Size { get; set; }
        public decimal Yard { get; set; }
        public int BrokerID { get; set; }
        public WebApi.Models.Broker.Broker Broker { get; set; }
        public virtual ICollection<Inspection> Inspections { get; set; }
        public virtual ICollection<Recovery> Recoveries { get; set; }
        public virtual ICollection<PropertyImage> PropertyImages { get; set; }

    }

    public class PropertyImage
    {
        public int PropertyImageID { get; set; } // Primary key

        // Other properties
        public string ImageName { get; set; }
        public string ImageData { get; set; }

        // Foreign key
        public int PropertyID { get; set; }
    }

    public class PropertyStatus
    {
        public int PropertyStatusID { get; set; }
        public string PropertyStatusName { get; set; }
    }

}
