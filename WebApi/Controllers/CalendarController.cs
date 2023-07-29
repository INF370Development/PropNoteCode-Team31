using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    public class CalendarController : Controller
    {
        public readonly ICalendarRepository _calendarRepository;
        public IActionResult Index()
        {
            return View();
        }
    }
}
