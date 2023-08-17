using WebApi.Models.Meeting;

namespace WebApi.Models.Interfaces
{
    public interface IMeetingRepository
    {
        Task<bool> SaveChangesAsync();
        Task AddMeeting(WebApi.Models.Meeting.Meeting meeting);
        Task<WebApi.Models.Meeting.Meeting[]> GetAllMeetingsAsync();
        Task EditMeeting(int meetingID, WebApi.Models.Meeting.Meeting meeting);
        Task DeleteMeetingAsync(WebApi.Models.Meeting.Meeting meeting);
        void Delete<T>(T entity) where T : class;
        Task<WebApi.Models.Meeting.Meeting> GetMeetingByID(int meetingID);

    }
}
