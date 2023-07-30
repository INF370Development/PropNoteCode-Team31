using System.ComponentModel.DataAnnotations;

namespace WebApi.Models.Calendar
{
    public class Calendar
    {
        [Key]
        public int NotificationID { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime NotificationDate { get; set; }
        public string Description { get; set; }
    }
}
