﻿using System.ComponentModel.DataAnnotations;
using WebApi.Models.Users;
using WebApi.Models.Property;
namespace WebApi.Models.Maintenance
{
    public class MaintenanceView
    {
        [Key]
        public int MaintenanceID { get; set; }
        public int PropertyID { get; set; }
        public int? ContractorID { get; set; }
        public int? MaintenanceStatusID { get; set; }
        public int? MaintenanceTypeID { get; set; }
        public DateTime? MaintenanceDate { get; set; }
        public string? MaintenanceTime { get; set; }
        public Property.Property Property { get; set; }
        public Contractor Contractor { get; set; }
        public MaintenanceStatus MaintenanceStatus { get; set; }
        public MaintenanceType MaintenanceType { get; set; }  
        public MaintenanceNote MaintenanceNote { get; set; }
        public Payment Payment { get; set; }

    }
}
