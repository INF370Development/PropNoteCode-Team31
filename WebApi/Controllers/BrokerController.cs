using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using WebApi.Models.Broker;
using WebApi.Models.Interfaces;

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

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
    }
}
