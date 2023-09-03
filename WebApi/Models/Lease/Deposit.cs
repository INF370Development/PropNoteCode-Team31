namespace WebApi.Models.Lease
{
    public class Deposit
    {
        public int DepositID { get; set; }
        public int LeaseID { get; set; }
        public string Amount { get; set; }
    }

    public class DepositRequest
    {
        public string Amount { get; set; }
    }
}
