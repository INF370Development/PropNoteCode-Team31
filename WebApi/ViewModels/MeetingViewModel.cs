namespace WebApi.ViewModels
{
    public class MeetingViewModel
    {
        public int MeetingID { get; set; }
        public string Description { get; set; }

        public DateTime Date { get; set; }
        public DateTime Time { get; set; }
        public string MeetingType { get; set; }
    }
}
