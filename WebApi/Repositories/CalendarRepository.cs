using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Calendar;

namespace WebApi.Repositories
{
    public class CalendarRepository : ICalendarRepository
    {
        private readonly AppDbContext _appDbContext;

        public CalendarRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<Calendar[]> LoadDataAsync()
        {
            IQueryable<Calendar> query = (IQueryable<Calendar>)_appDbContext.Notification;
            return await query.ToArrayAsync();
        }
    }
}
