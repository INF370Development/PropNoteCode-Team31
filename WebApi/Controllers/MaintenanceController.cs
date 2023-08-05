using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using WebApi.Interfaces;
using WebApi.Models.Admin;
using WebApi.Models.Maintenance;

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
                MaintenaceID = paymentViewModel.MaintenanceID,
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
                { existingPayment.MaintenaceID = paymentViewModel.MaintenanceID; }
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
                MaintenaceTypeName = maintenanceTypeViewModel.MaintenaceTypeName
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
                if (maintenanceTypeViewModel.MaintenaceTypeName != "")
                { existingMaintenanceType.MaintenaceTypeName = maintenanceTypeViewModel.MaintenaceTypeName; }

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
                MaintenaceStatusName = maintenanceStatusViewModel.MaintenaceStatusName
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
                if (maintenanceStatusViewModel.MaintenaceStatusName != "")
                { existingMaintenanceStatus.MaintenaceStatusName = maintenanceStatusViewModel.MaintenaceStatusName; }

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

        //MaintenancePropertyLines Actions

        [HttpGet]
        [Route("GetAllMaintenancePropertyLines")]
        public async Task<IActionResult> GetAllMaintenancePropertyLines()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenancePropertyLineAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet]
        [Route("GetMaintenancePropertyLine/{MaintenanceId}/{PropertyLineId}")]
        public async Task<IActionResult> GetMaintenancePropertyLine(int MaintenanceId, int PropertyLineId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenancePropertyLineByID(MaintenanceId, PropertyLineId);

                if (result == null) return NotFound("MaintenancePropertyLine does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddMaintenancePropertyLine")]
        public async Task<IActionResult> AddMaintenancePropertyLine(int MaintenanceId, int PropertyId)
        {
            try
            {
                var maintenancePropertyLine = new MaintenancePropertyLine
                {
                    MaintenaceID = MaintenanceId,
                    PropertyID = PropertyId
                };
                return Ok(await _maintenanceRepository.AddMaintenancePropertyLine(maintenancePropertyLine));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpDelete]
        [Route("DeleteMaintenancePropertyLine/{MaintenanceId}/{PropertyLineId}")]
        public async Task<IActionResult> DeleteMaintenancePropertyLine(int MaintenanceId, int PropertyLineId)
        {
            try
            {
                MaintenancePropertyLine existingMaintenancePropertyLine = await _maintenanceRepository.GetMaintenancePropertyLineByID(MaintenanceId, PropertyLineId);
                if (existingMaintenancePropertyLine == null) return NotFound($"The MaintenancePropertyLine does not exist");
                return Ok(await _maintenanceRepository.DeleteMaintenancePropertyLineAsync(existingMaintenancePropertyLine));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        [HttpGet]
        [Route("GetAllMaintenanceContractorLines")]
        public async Task<IActionResult> GetAllMaintenanceContractorLines()
        {
            try
            {
                var results = await _maintenanceRepository.GetAllMaintenanceContractorLineAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet]
        [Route("GetMaintenanceContractorLine/{MaintenanceId}/{ContractorLineId}")]
        public async Task<IActionResult> GetMaintenanceContractorLine(int MaintenanceId, int ContractorLineId)
        {
            try
            {
                var result = await _maintenanceRepository.GetMaintenanceContractorLineByID(MaintenanceId, ContractorLineId);

                if (result == null) return NotFound("MaintenanceContractorLine does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddMaintenanceContractorLine")]
        public async Task<IActionResult> AddMaintenanceContractorLine(int MaintenanceId, int ContractorId)
        {
            try
            {
                var maintenanceContractorLine = new MaintenanceContractorLine
                {
                    MaintenaceID = MaintenanceId,
                    ContractorID = ContractorId
                };
                return Ok(await _maintenanceRepository.AddMaintenanceContractorLine(maintenanceContractorLine));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpDelete]
        [Route("DeleteMaintenanceContractorLine/{MaintenanceId}/{ContractorLineId}")]
        public async Task<IActionResult> DeleteMaintenanceContractorLine(int MaintenanceId, int ContractorLineId)
        {
            try
            {
                MaintenanceContractorLine existingMaintenanceContractorLine = await _maintenanceRepository.GetMaintenanceContractorLineByID(MaintenanceId, ContractorLineId);
                if (existingMaintenanceContractorLine == null) return NotFound($"The MaintenanceContractorLine does not exist");
                return Ok(await _maintenanceRepository.DeleteMaintenanceContractorLineAsync(existingMaintenanceContractorLine));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


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
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet]
        [Route("GetMaintenance/{MaintenanceId}")]
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
        [HttpPost]
        [Route("AddMaintenance")]
        public async Task<IActionResult> AddMaintenance(int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, DateTime Time)
        {
            //Time Format "14:30:45"
            //Date Format "2023-07-30"
            try
            {
                Maintenance maintenance=new Maintenance() 
                {
                    PropertyID=PropertyId,
                    EmployeeID=EmployeeId,
                    ContractorID=ContractorId,
                    MaintenanceStatusID=MaintenanceStatusId,
                    MaintenanceTypeID=MaintenanceTypeId, 
                    MaintenanceDate=Date,
                    MaintenanceTime= Time
                };
                return Ok(await _maintenanceRepository.AddMaintenance(maintenance));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpPut]
        [Route("EditMaintenance")]
        public async Task<IActionResult> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, DateTime Time)
        {
            try
            {
                var existingMaintenance = await _maintenanceRepository.GetMaintenanceByID(MaintenanceId);
                if (existingMaintenance == null) return NotFound($"The Maintenance does not exist");
                return Ok(await _maintenanceRepository.EditMaintenance( MaintenanceId,  PropertyId,  EmployeeId,  ContractorId,  MaintenanceStatusId,  MaintenanceTypeId,  Date,  Time));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpDelete]
        [Route("DeleteMaintenance/{MaintenanceId}")]
        public async Task<IActionResult> DeleteMaintenance(int MaintenanceId)
        {
            try
            {
                Maintenance existingMaintenance = await _maintenanceRepository.GetMaintenanceByID(MaintenanceId);
                if (existingMaintenance == null) return NotFound($"The Maintenance does not exist");
                return Ok(await _maintenanceRepository.DeleteMaintenanceAsync(existingMaintenance));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

    }
}
