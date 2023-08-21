namespace WebApi.Models.Property
{
    public class Recovery
    {
        public int RecoveryID { get; set; } 
        public int PropertyID { get; set; }
        public int RecoveryTypeID { get; set; }
        public string RecoveryDescription { get; set; }
        public decimal RecoveryAmount { get; set; }
        public RecoveryType RecoveryType { get; set; }
    }

    public class RecoveryType
    {
        public int RecoveryTypeID { get; set; }
        public string RecoveryTypeDescription { get; set; }
    }

    public class RecoveryRequest
    {
        public int PropertyID { get; set; }
        public int RecoveryTypeID { get; set; }
        public string RecoveryDescription { get; set; }
        public decimal RecoveryAmount { get; set; }
    }
}
