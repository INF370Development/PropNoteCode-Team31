using WebApi.Models.Calendar;

namespace WebApi.Interfaces
{
    public interface ICalendarRepository
    {
        Task<Calendar[]> LoadDataAsync();
    }
}
