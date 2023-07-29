using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;
using WebApi.Models.Admin;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BrokerController : Controller
    {
        private readonly IBrokerRepository _brokerRepository;
        public BrokerController(IBrokerRepository repository)
        {
            _brokerRepository = repository;
        }

        [HttpGet]
        [Route("GetAllBrokers")]
        public async Task<IActionResult> GetAllBrokers()
        {
            
            try
            {
                List<Broker> brokers = new();
                var results = await _brokerRepository.GetAllBrokersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }
        [HttpGet]
        [Route("GetBroker/{BrokerId}")]
        public async Task<IActionResult> GetBroker(int BrokerId)
        {
            try
            {
                var result = await _brokerRepository.GetBrokerByID(BrokerId);

                if (result == null) return NotFound("Broker does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddBroker")]
        public async Task<IActionResult> AddBroker(string Name, string Surname, string PhoneNumber, string OfficeAddress, string LicenseNumber, string CommissionRate)
        {
            
            try
            {var broker = new Broker
            {
                Name = Name,
                Surname = Surname,
                PhoneNumber = PhoneNumber,
                OfficeAddress = OfficeAddress,
                LicenseNumber = LicenseNumber,
                CommissionRate = CommissionRate
            };
                return Ok(await _brokerRepository.AddBroker(broker));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpPut]
        [Route("EditBroker")]
        public async Task<IActionResult> EditBroker(int brokerID, string Name, string Surname, string PhoneNumber, string OfficeAddress, string LicenseNumber, string CommissionRate)
        {

            try
            {
                var allBrokers = await _brokerRepository.GetAllBrokersAsync();
                var existingBroker = allBrokers.FirstOrDefault(x => x.BrokerID == brokerID);
                if (existingBroker == null) return NotFound($"The broker does not exist");
                var broker = new Broker
                {
                    Name = Name,
                    Surname = Surname,
                    PhoneNumber = PhoneNumber,
                    OfficeAddress = OfficeAddress,
                    LicenseNumber = LicenseNumber,
                    CommissionRate = CommissionRate
                };
                return Ok(await _brokerRepository.EditBroker(brokerID, broker));

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpDelete]
        public async Task<IActionResult> DeleteBroker(int brokerID)
        {
            try
            {
                Broker existingBroker = (Broker)await _brokerRepository.GetBrokerByID(brokerID);
                if (existingBroker == null) return NotFound($"The Broker does not exist");
                return Ok(await _brokerRepository.DeleteBrokerAsync(existingBroker));

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        [HttpPut]
        [Route("EditBroker")]
        public async Task<IActionResult> EditBroker(int brokerID, BrokerViewModel brokerModel)
        {

            try
            {
                var allBrokers = await _brokerRepository.GetAllBrokersAsync();
                var existingBroker = allBrokers.FirstOrDefault(x => x.BrokerID == brokerID);
                if (existingBroker == null) return NotFound($"The broker does not exist");

                if (brokerModel.Name == "")
                {
                    existingBroker.Name = existingBroker.Name;
                }
                else
                {
                    existingBroker.Name = brokerModel.Name;
                }
                if (brokerModel.Surname == "")
                {
                    existingBroker.Surname = brokerModel.Surname;
                }
                else
                {
                    existingBroker.Surname = brokerModel.Surname;
                }
                if (brokerModel.PhoneNumber == "")
                {
                    existingBroker.PhoneNumber = existingBroker.PhoneNumber;
                }
                else
                {
                    existingBroker.PhoneNumber = brokerModel.PhoneNumber;
                }
                if (brokerModel.OfficeAddress == "")
                {
                    existingBroker.OfficeAddress = existingBroker.OfficeAddress;
                }
                else
                {
                    existingBroker.OfficeAddress = brokerModel.OfficeAddress;
                }
                if (brokerModel.LicenseNumber == "")
                {
                    existingBroker.LicenseNumber = existingBroker.LicenseNumber;
                }
                else
                {
                    existingBroker.LicenseNumber = brokerModel.LicenseNumber;
                }
                if (brokerModel.CommissionRate == "")
                {
                    existingBroker.CommissionRate = existingBroker.CommissionRate;
                }
                else
                {
                    existingBroker.CommissionRate = brokerModel.CommissionRate;
                }

                if (await _brokerRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingBroker);
                }

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteBroker(int brokerID)
        {
            try
            {
                var allBrokers = await _brokerRepository.GetAllBrokersAsync();
                var existingBrokers = allBrokers.FirstOrDefault(x => x.BrokerID == brokerID);

                if (existingBrokers == null) return NotFound($"The Broker does not exist");

                _brokerRepository.Delete(existingBrokers);

                if (await _brokerRepository.SaveChangesAsync()) return Ok(existingBrokers);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}
