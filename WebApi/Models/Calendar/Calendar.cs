namespace WebApi.Models.Calendar
{
    public class Calendar
    {
        public int NotificationID { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Description { get; set; }
    }
}
