using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;
using WebApi.ViewModels;
using WebApi.Models.Meeting;
using WebApi.Models.Interfaces;
using WebApi.Repositories;
using WebApi.Models.Meeting;
using WebApi.Models.Broker;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeetingController : Controller
    {
        private readonly IMeetingRepository _meetingRepository;

        public MeetingController(IMeetingRepository repository)
        {
            _meetingRepository = repository;
        }

        [HttpGet]
        [Route("GetAllMeetings")]
        public async Task<IActionResult> GGetAllMeetings()
        {
            //Test
            try
            {
                List<Meeting> meetings = new();
                var results = await _meetingRepository.GetAllMeetingsAsync();
                foreach (var meeting in results)
                {
                    meetings.Add(new Meeting
                    {
                        MeetingID = meeting.MeetingID,
                        Description = meeting.Description,
                        Date = meeting.Date,
                        Time = meeting.Time,
                        MeetingType = meeting.MeetingType

                    });
                }
                return Ok(meetings);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetMeetingByID")]
        public async Task<IActionResult> GetMeetingID(int meetingID)
        {
            try
            {
                var result = await _meetingRepository.GetMeetingByID(meetingID);

                if (result == null) return NotFound("Meeting does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddMeeting")]
        public async Task<IActionResult> AddMeeting(MeetingViewModel meetingModel)
        {
            var meeting = new Meeting
            {
                
                Description = meetingModel.Description,
                Date = meetingModel.Date,
                Time = meetingModel.Time,
                MeetingType = meetingModel.MeetingType
            };
            try
            {
                await _meetingRepository.AddMeeting(meeting);

                return Ok(meeting);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        [HttpPut]
        [Route("EditMeeting")]
        public async Task<IActionResult> EditMeeting(int meetingID, MeetingViewModel meetingModel)
        {
            try
            {
                var allMeetings = await _meetingRepository.GetAllMeetingsAsync();
                var existingMeeting = allMeetings.FirstOrDefault(x => x.MeetingID == meetingID);
                if (existingMeeting == null) return NotFound($"The meeting does not exist");

                if (meetingModel.Description == "")
                {
                    existingMeeting.Description = existingMeeting.Description;
                }
                else
                {
                    existingMeeting.Description = meetingModel.Description;
                }
                if (meetingModel.Date == null)
                {
                    existingMeeting.Date= meetingModel.Date;
                }
                else
                {
                    existingMeeting.Date= meetingModel.Date;
                }
                if (meetingModel.Time == null)
                {
                    existingMeeting.Time = existingMeeting.Time;
                }
                else
                {
                    existingMeeting.Time = existingMeeting.Time;
                }
                if (meetingModel.MeetingType == "")
                {
                    existingMeeting.MeetingType = existingMeeting.MeetingType;
                }
                else
                {
                    existingMeeting.MeetingType = existingMeeting.MeetingType;
                }
              

                if (await _meetingRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingMeeting);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteMeeting")]
        public async Task<IActionResult> DeleteMeeting(int meetingID)
        {
            try
            {
                var allMeetings = await _meetingRepository.GetAllMeetingsAsync();
                var existingMeetings = allMeetings.FirstOrDefault(x => x.MeetingID == meetingID);

                if (existingMeetings == null) return NotFound($"The Meeting does not exist");

                _meetingRepository.Delete(existingMeetings);

                if (await _meetingRepository.SaveChangesAsync()) return Ok(existingMeetings);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

    }
}
