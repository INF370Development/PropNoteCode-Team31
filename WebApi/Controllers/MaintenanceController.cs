using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Admin;
using WebApi.Models.Users;
using WebApi.Models.Maintenance;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    //[Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : Controller
    {
        private readonly IMaintenanceRepository _maintenanceRepository;
        private readonly IContractorRepository _contractorRepository;
        public MaintenanceController(IContractorRepository con_repository, IMaintenanceRepository repository)
        {
            _contractorRepository = con_repository; 
            _maintenanceRepository = repository;
        }

        [HttpGet("GetAllPayments")]
        public async Task<IActionResult> GetAllPayments()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllPaymentAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("GetPayment/{PaymentId}")]
        public async Task<IActionResult> GetPayment(int PaymentId)
        {
            try
            {
                var result = await _maintenanceRepository.GetPaymentByID(PaymentId);

                if (result == null)
                    return NotFound("Payment does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddPayment")]
        public async Task<IActionResult> AddPayment(PaymentViewModel paymentViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            var payment = new Payment
            {
                MaintenanceID = paymentViewModel.MaintenanceID,
                Amount = paymentViewModel.Amount
            };

            try
            {
                return Ok(await _maintenanceRepository.AddPayment(payment));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditPayment")]
        public async Task<IActionResult> EditPayment(int id, PaymentViewModel paymentViewModel)
        {
            try
            {
                var existingPayment = await _maintenanceRepository.GetPaymentByID(id);
                if (existingPayment == null)
                    return NotFound($"The payment does not exist");

                if (paymentViewModel.MaintenanceID != 0)
                { existingPayment.MaintenanceID = paymentViewModel.MaintenanceID; }
                if (paymentViewModel.Amount != 0)
                { existingPayment.Amount = paymentViewModel.Amount; }

                return Ok(await _maintenanceRepository.SaveChangesAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeletePayment")]
        public async Task<IActionResult> DeletePayment(int paymentID)
        {
            try
            {
                var existingPayment = await _maintenanceRepository.GetPaymentByID(paymentID);
                if (existingPayment == null)
                    return NotFound($"The Payment does not exist");

                return Ok(await _maintenanceRepository.DeletePaymentAsync(existingPayment));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        // MaintenanceTypes Actions

        [HttpGet("GetAllMaintenanceTypes")]
        public async Task<IActionResult> GetAllMaintenanceTypes()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenanceTypeAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("GetMaintenanceType/{MaintenanceTypeId}")]
        public async Task<IActionResult> GetMaintenanceType(int MaintenanceTypeId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceTypeByID(MaintenanceTypeId);

                if (result == null) return NotFound("MaintenanceType does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddMaintenanceType")]
        public async Task<IActionResult> AddMaintenanceType(MaintenanceTypeViewModel maintenanceTypeViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            var maintenanceType = new MaintenanceType
            {
                MaintenanceTypeName = maintenanceTypeViewModel.MaintenanceTypeName
            };

            try
            {
                return Ok(await _maintenanceRepository.AddMaintenanceType(maintenanceType));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditMaintenanceType")]
        public async Task<IActionResult> EditMaintenanceType(int id, MaintenanceTypeViewModel maintenanceTypeViewModel)
        {
            try
            {
                var existingMaintenanceType = await _maintenanceRepository.GetMaintenanceTypeByID(id);
                if (existingMaintenanceType == null) return NotFound($"The MaintenanceType does not exist");
                if (maintenanceTypeViewModel.MaintenanceTypeName != "")
                { existingMaintenanceType.MaintenanceTypeName = maintenanceTypeViewModel.MaintenanceTypeName; }

                return Ok(await _maintenanceRepository.SaveChangesAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteMaintenanceType")]
        public async Task<IActionResult> DeleteMaintenanceType(int MaintenanceTypeId)
        {
            try
            {
                var existingMaintenanceType = await _maintenanceRepository.GetMaintenanceTypeByID(MaintenanceTypeId);
                if (existingMaintenanceType == null) return NotFound($"The MaintenanceType does not exist");

                return Ok(await _maintenanceRepository.DeleteMaintenanceTypeAsync(existingMaintenanceType));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        [HttpGet("GetAllMaintenanceStatuses")]
        public async Task<IActionResult> GetAllMaintenanceStatuses()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenanceStatusAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("GetMaintenanceStatus/{MaintenanceStatusId}")]
        public async Task<IActionResult> GetMaintenanceStatus(int MaintenanceStatusId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceStatusByID(MaintenanceStatusId);

                if (result == null) return NotFound("MaintenanceStatus does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddMaintenanceStatus")]
        public async Task<IActionResult> AddMaintenanceStatus(MaintenanceStatusViewModel maintenanceStatusViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            var maintenanceStatus = new MaintenanceStatus
            {
                MaintenanceStatusName = maintenanceStatusViewModel.MaintenanceStatusName
            };

            try
            {
                return Ok(await _maintenanceRepository.AddMaintenanceStatus(maintenanceStatus));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditMaintenanceStatus")]
        public async Task<IActionResult> EditMaintenanceStatus(int id, MaintenanceStatusViewModel maintenanceStatusViewModel)
        {
            try
            {
                var existingMaintenanceStatus = await _maintenanceRepository.GetMaintenanceStatusByID(id);
                if (existingMaintenanceStatus == null) return NotFound($"The MaintenanceStatus does not exist");
                if (maintenanceStatusViewModel.MaintenanceStatusName != "")
                { existingMaintenanceStatus.MaintenanceStatusName = maintenanceStatusViewModel.MaintenanceStatusName; }

                return Ok(await _maintenanceRepository.SaveChangesAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteMaintenanceStatus")]
        public async Task<IActionResult> DeleteMaintenanceStatus(int MaintenanceStatusId)
        {
            try
            {
                var existingMaintenanceStatus = await _maintenanceRepository.GetMaintenanceStatusByID(MaintenanceStatusId);
                if (existingMaintenanceStatus == null) return NotFound($"The MaintenanceStatus does not exist");

                return Ok(await _maintenanceRepository.DeleteMaintenanceStatusAsync(existingMaintenanceStatus));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //MaintenanceNote Actions

        [HttpGet("GetAllMaintenanceNotes")]
        public async Task<IActionResult> GetAllMaintenanceNotes()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenanceNoteAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet("GetMaintenanceNoteByID/{maintenanceNoteID}")]
        public async Task<IActionResult> GetMaintenanceNoteByID(int maintenanceNoteID)
        {
            try
            {
                var maintenanceNote = await _maintenanceRepository.GetMaintenanceNoteByID(maintenanceNoteID);

                if (maintenanceNote == null)
                {
                    return NotFound("Maintenance note not found");
                }

                // You can customize the data you want to return here or return the entire maintenance note object.
                var maintenanceNoteResponse = new
                {
                    MaintenanceNoteID = maintenanceNote.MaintenanceNoteID,
                    Description = maintenanceNote.MaintenanceNoteDescription,
                    // Include other properties as needed
                };

                return Ok(maintenanceNoteResponse);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpGet("GetMaintenanceNotesByMaintenanceID/{maintenanceID}")]
        public async Task<IActionResult> GetMaintenanceNotesByMaintenanceID(int maintenanceID)
        {
            try
            {
                var maintenanceNotes = await _maintenanceRepository.GetMaintenanceNotesByMaintenanceIDAsync(maintenanceID);

                if (maintenanceNotes == null)
                {
                    return NotFound("No maintenance notes found for the specified maintenance ID");
                }

                // You can customize the data you want to return here or return the entire list of maintenance notes.
                var maintenanceNotesResponse = new List<object>();
                foreach (var note in maintenanceNotes)
                {
                    maintenanceNotesResponse.Add(new
                    {
                        MaintenanceNoteID = note.MaintenanceNoteID,
                        Description = note.MaintenanceNoteDescription,
                        // Include other properties as needed
                    });
                }

                return Ok(maintenanceNotesResponse);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddMaintenanceNote")]
        public async Task<IActionResult> AddMaintenanceNote(MaintenanceNoteViewModel maintenanceNoteViewModel)
        {
            if (!ModelState.IsValid)
                return BadRequest("Invalid input data");

            var maintenanceNote = new MaintenanceNote
            {
                MaintenanceID = maintenanceNoteViewModel.MaintenanceID,
                MaintenanceNoteDescription = maintenanceNoteViewModel.MaintenanceNoteDescription
            };

            try
            {
                return Ok(await _maintenanceRepository.AddMaintenanceNote(maintenanceNote));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpPost("AddMaintenanceNoteToMaintenance/{maintenanceID}")]
        public async Task<IActionResult> AddMaintenanceNoteToMaintenance(int maintenanceID, MaintenanceNoteViewModel maintenanceNoteViewModel)
        {
            try
            {
                // Check if the Maintenance with the provided maintenanceID exists
                var existingMaintenance = await _maintenanceRepository.GetMaintenanceByID(maintenanceID);

                if (existingMaintenance == null)
                {
                    return NotFound("Maintenance does not exist");
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest("Invalid input data");
                }

                var maintenanceNote = new MaintenanceNote
                {
                    MaintenanceID = maintenanceID,
                    MaintenanceNoteDescription = maintenanceNoteViewModel.MaintenanceNoteDescription
                };

                var addedMaintenanceNote = await _maintenanceRepository.AddMaintenanceNote(maintenanceNote);

                return Ok(addedMaintenanceNote);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditMaintenanceNote/{maintenanceNoteID}")]
        public async Task<IActionResult> EditMaintenanceNote(int id, MaintenanceNoteViewModel maintenanceNoteViewModel)
        {
            try
            {
                var existingMaintenanceNote = await _maintenanceRepository.GetMaintenanceNoteByID(id);
                if (existingMaintenanceNote == null) return NotFound($"The MaintenanceStatus does not exist");
                if (existingMaintenanceNote.MaintenanceNoteDescription != "")
                { existingMaintenanceNote.MaintenanceNoteDescription = maintenanceNoteViewModel.MaintenanceNoteDescription; }
                if (existingMaintenanceNote.MaintenanceID != 0)
                { existingMaintenanceNote.MaintenanceID = maintenanceNoteViewModel.MaintenanceID; }

                return Ok(await _maintenanceRepository.SaveChangesAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteMaintenanceNote/{maintenanceNoteID}")]
        public async Task<IActionResult> DeleteMaintenanceNote(int MaintenanceStatusId)
        {
            try
            {
                var existingMaintenanceStatus = await _maintenanceRepository.GetMaintenanceNoteByID(MaintenanceStatusId);
                if (existingMaintenanceStatus == null) return NotFound($"The MaintenanceStatus does not exist");

                return Ok(await _maintenanceRepository.DeleteMaintenanceNoteAsync(existingMaintenanceStatus));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //Maintenance Action

        [HttpGet]
        [Route("GetAllMaintenances")]
        public async Task<IActionResult> GetAllMaintenances()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenanceAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }
        [HttpPut]
        [Route("UpdateMaintenance/{maintenanceID}")]
        public async Task<IActionResult> UpdateMaintenance(int maintenanceID, [FromBody] MaintenanceUpdateModel maintenanceUpdateModel)
        {
            try
            {
                // Retrieve the existing maintenance record from the database
                var existingMaintenance = await _maintenanceRepository.GetMaintenanceAsync(maintenanceID);

                if (existingMaintenance == null)
                {
                    // Return a not found response if the maintenance record was not found
                    return NotFound();
                }

                // Update only the specified fields
                existingMaintenance.ContractorID = maintenanceUpdateModel.ContractorID;
                existingMaintenance.MaintenanceDate = maintenanceUpdateModel.MaintenanceDate;
                existingMaintenance.MaintenanceTime = maintenanceUpdateModel.MaintenanceTime;
                existingMaintenance.MaintenanceTypeID = maintenanceUpdateModel.MaintenanceTypeID;

                // Update the maintenance record in the database
                var updatedMaintenance = await _maintenanceRepository.UpdateMaintenanceAsync(existingMaintenance);

                if (updatedMaintenance != null)
                {
                    // Return a successful response
                    return Ok(updatedMaintenance);
                }
                else
                {
                    // Return a not found response if the maintenance record was not found
                    return NotFound();
                }
            }
            catch (Exception)
            {
                // Handle exceptions and return an error response
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }



        [HttpGet]
        [Route("GetMaintenanceByID/{maintenanceID}")]
        public async Task<IActionResult> GetMaintenanceByID(int maintenanceID)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceByID(maintenanceID);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetMaintenanceByProperty/{PropertyId}")]
        public async Task<IActionResult> GetMaintenanceByPropertyID(int PropertyId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceByPropertyID(PropertyId);

                if (result == null || !result.Any())
                {
                    return NotFound("No maintenance records found for this property.");
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("AddMaintenance")]
        public async Task<IActionResult> AddMaintenance(MaintenanceViewModel maintenanceViewModel)
        {
            var maintenance = new Maintenance()
            {
                PropertyID = maintenanceViewModel.PropertyID,
                ContractorID = maintenanceViewModel.ContractorID,
                MaintenanceStatusID = maintenanceViewModel.MaintenanceStatusID,
                MaintenanceTypeID = maintenanceViewModel.MaintenanceTypeID,
                MaintenanceDate = maintenanceViewModel.MaintenanceDate,
                MaintenanceTime=maintenanceViewModel.MaintenanceTime,
            };

            try
            {
                return Ok(await _maintenanceRepository.AddMaintenance(maintenance));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditMaintenance")]
        public async Task<IActionResult> EditMaintenance(int Id, MaintenanceViewModel maintenanceViewModel)
        {
            var existingMaintenance = await _maintenanceRepository.GetMaintenanceByID(Id);
            if (existingMaintenance == null)
            { return NotFound($"The Maintenance does not exist"); }
            if (maintenanceViewModel.PropertyID != 0)
                existingMaintenance.PropertyID = maintenanceViewModel.PropertyID;
            if (maintenanceViewModel.ContractorID != 0)
                existingMaintenance.ContractorID = maintenanceViewModel.ContractorID;
            if (maintenanceViewModel.MaintenanceStatusID != 0)
                existingMaintenance.MaintenanceStatusID = maintenanceViewModel.MaintenanceStatusID;
            if (maintenanceViewModel.MaintenanceTypeID != 0)
                existingMaintenance.MaintenanceTypeID = maintenanceViewModel.MaintenanceTypeID;
            if (maintenanceViewModel.MaintenanceDate != null)
                existingMaintenance.MaintenanceDate = maintenanceViewModel.MaintenanceDate;
            if (maintenanceViewModel.MaintenanceTime != "")
                existingMaintenance.MaintenanceTime = maintenanceViewModel.MaintenanceTime;
            try
            {
                return Ok(await _maintenanceRepository.SaveChangesAsync());
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteMaintenance/{MaintenanceId}")]
        public async Task<IActionResult> DeleteMaintenance(int MaintenanceId)
        {
            try
            {
                var existingMaintenance = await _maintenanceRepository.GetMaintenanceByID(MaintenanceId);
                if (existingMaintenance == null)
                    return NotFound($"The Maintenance does not exist");
                return Ok(await _maintenanceRepository.DeleteMaintenanceAsync(existingMaintenance));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
    }
}