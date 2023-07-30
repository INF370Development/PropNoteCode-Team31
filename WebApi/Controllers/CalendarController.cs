using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;
using WebApi.Models.Data;
using WebApi.Models.Calendar;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarController : Controller
    {
        public readonly ICalendarRepository _calendarRepository;
      
        public CalendarController(ICalendarRepository calendarRepository)
        {
            _calendarRepository = calendarRepository;
        }

        [HttpGet]
        [Route("GetLoadData")]
        public async Task<IActionResult> GetLoadData()
        {
            try
            {
                var allData = await _calendarRepository.LoadDataAsync();
                List<Calendar> notifications = new();
                foreach (var notification in allData)
                {
                    notifications.Add(new Calendar
                    {
                        NotificationID = notification.NotificationID,
                        StartTime = notification.StartTime,
                        EndTime = notification.EndTime,
                        NotificationDate = notification.NotificationDate,
                        Description = notification.Description,
                    });
                }

                return Ok(allData);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }
    }
}
