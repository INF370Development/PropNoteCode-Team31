using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Admin;
using WebApi.Models.Data;
using WebApi.Models.Maintenance;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MaintenanceController : Controller
    {
        private readonly IMaintenanceRepository _maintenanceRepository;
        public MaintenanceController(IMaintenanceRepository repository)
        {
            _maintenanceRepository = repository;
        }

// Payment Actions

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
        public async Task<IActionResult> EditPayment(int id,PaymentViewModel paymentViewModel)
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
        public async Task<IActionResult> EditMaintenanceType(int id,MaintenanceTypeViewModel maintenanceTypeViewModel)
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

//MaintenanceStatus Actions

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
        public async Task<IActionResult> AddMaintenanceStatus( MaintenanceStatusViewModel maintenanceStatusViewModel)
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
        public async Task<IActionResult> EditMaintenanceStatus(int id,MaintenanceStatusViewModel maintenanceStatusViewModel)
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
        [HttpGet("GetMaintenanceNote/{GetMaintenanceNoteId}")]
        public async Task<IActionResult> GetMaintenanceNote(int GetMaintenanceNoteId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceNoteByID(GetMaintenanceNoteId);

                if (result == null) return NotFound("MaintenanceStatus does not exist");

                return Ok(result);
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
                MaintenanceID=maintenanceNoteViewModel.MaintenanceID,
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
        [HttpPut("EditMaintenanceNote")]
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
        [HttpDelete("DeleteMaintenanceNote")]
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


        [HttpGet("GetAllMaintenances")]
        public async Task<IActionResult> GetAllMaintenances()
        {
            try
            {
                List<MaintenanceView> maintenances = new();
            
                var results = await _maintenanceRepository.GetAllMaintenanceAsync();
                foreach (var maintenance in results)
                {
                    maintenances.Add(new MaintenanceView
                    {
                        MaintenanceID = maintenance.MaintenanceID,
                        PropertyID = maintenance.PropertyID,
                        ContractorID = maintenance.ContractorID,
                        MaintenanceStatusID = maintenance.MaintenanceStatusID,
                        MaintenanceTypeID = maintenance.MaintenanceTypeID,
                        MaintenanceDate = maintenance.MaintenanceDate,
                        Property = maintenance.Property,
                        Contractor = maintenance.Contractor,
                        MaintenanceStatus = maintenance.MaintenanceStatus,
                        MaintenanceType = maintenance.MaintenanceType,
                        MaintenanceNote = (MaintenanceNote) await  _maintenanceRepository.GetMaintenanceNoteByID(maintenance.MaintenanceID),
                        Payment=(Payment) await _maintenanceRepository.GetPaymentByID(maintenance.MaintenanceID)
                    }); ;
                }
                return Ok(maintenances);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet("GetMaintenance/{MaintenanceId}")]
        public async Task<IActionResult> GetMaintenance(int MaintenanceId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceByID(MaintenanceId);

                if (result == null) return NotFound("Maintenance does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
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
                MaintenanceDate = maintenanceViewModel.MaintenanceDate
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

            var existingMaintenance = await _maintenanceRepository.GetMaintenanceByID( Id);
            if (existingMaintenance == null)
            { return NotFound($"The Maintenance does not exist"); }
            if(maintenanceViewModel.PropertyID!=0)
                existingMaintenance.PropertyID = maintenanceViewModel.PropertyID;
            if (maintenanceViewModel.ContractorID != 0)
                existingMaintenance.ContractorID = maintenanceViewModel.ContractorID;
            if (maintenanceViewModel.MaintenanceStatusID != 0)
                existingMaintenance.MaintenanceStatusID = maintenanceViewModel.MaintenanceStatusID;
            if (maintenanceViewModel.MaintenanceTypeID != 0)
                existingMaintenance.MaintenanceTypeID = maintenanceViewModel.MaintenanceTypeID;
            
                existingMaintenance.MaintenanceDate = maintenanceViewModel.MaintenanceDate;
            

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
