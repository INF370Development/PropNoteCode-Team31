namespace WebApi.Models.Lease
{
    public class Deposit
    {
        public int DepositID { get; set; }
        public int LeaseID { get; set; }
        public decimal Amount { get; set; }
    }

    public class DepositRequest
    {
        public decimal Amount { get; set; }
    }
}
