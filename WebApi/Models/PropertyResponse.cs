﻿namespace WebApi.Models
{
    public class PropertyResponse
    {
        public string Description { get; set; }
        public string BuildingNumber { get; set; }
        public string Street { get; set; }
        public string Suburb { get; set; }
        public int PurchaseAmount { get; set; }
        public DateTime PurchaseDate { get; set; }
        public string Size { get; set; }
        public string Yard { get; set; }

        public string BrokerName { get; set; }
    }
}
