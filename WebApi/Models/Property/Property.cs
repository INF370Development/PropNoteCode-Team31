﻿namespace WebApi.Models.Property
{
    public class Property
    {
        public int PropertyID { get; set; }
        public string Description { get; set; }
        public int BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public int PurchaseAmount { get; set; }
        public string PurchaseYear { get; set; }
        public string Size { get; set; }
        public string Yard { get; set; }
        public int BrokerID { get; set; }
        public WebApi.Models.Admin.Broker Broker { get; set; }
    }
}
