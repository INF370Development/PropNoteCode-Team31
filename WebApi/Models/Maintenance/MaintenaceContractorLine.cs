﻿using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Maintenance
{
    public class MaintenaceContractorLine
    {
        [Key]
        public int MaintenaceContractorLiineID { get; set; }
        public int MaintenaceID { get; set; }
        public int ContractorID { get; set; }

    }
}
