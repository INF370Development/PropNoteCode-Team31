using WebApi.Models;
using WebApi.ViewModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using WebApi.Models.Admin;
using WebApi.Models.Interfaces;
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
            //Test
            try
            {
                List<Broker> brokers = new();
                var results = await _brokerRepository.GetAllBrokersAsync();
                foreach (var broker in results)
                {
                    brokers.Add(new Broker
                    {
                        BrokerID = broker.BrokerID,
                        Name = broker.Name,
                        Surname = broker.Surname,
                        PhoneNumber = broker.PhoneNumber,
                        OfficeAddress = broker.OfficeAddress,
                        LicenseNumber = broker.LicenseNumber,
                        CommissionRate = broker.CommissionRate
                    });
                }
                return Ok(brokers);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetBrokerByID")]
        public async Task<IActionResult> GetBrokerID(int brokerID)
        {
            try
            {
                var result = await _brokerRepository.GetBrokerByID(brokerID);

                if (result == null) return NotFound("Broker does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost]
        [Route("AddBroker")]
        public async Task<IActionResult> AddBroker(BrokerViewModel brokerModel)
        {
            var broker = new Broker
            {
                Name = brokerModel.Name,
                Surname = brokerModel.Surname,
                PhoneNumber = brokerModel.PhoneNumber,
                OfficeAddress = brokerModel.OfficeAddress,
                LicenseNumber = brokerModel.LicenseNumber,
                CommissionRate = brokerModel.CommissionRate
            };
            try
            {
                await _brokerRepository.AddBroker(broker);

                return Ok(broker);
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
        [Route("DeleteBroker")]
        public async Task<IActionResult> DeleteBroker(int brokerID)
        {
            try
            {
                var allBrokers = await _brokerRepository.GetAllBrokersAsync();
                var existingBrokers = allBrokers.FirstOrDefault(x => x.BrokerID == brokerID);

                if (existingBrokers == null) return NotFound($"The Broker does not exist");

                _brokerRepository.DeleteBrokerAsync(existingBrokers);

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