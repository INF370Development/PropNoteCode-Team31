using WebApi.Models;
using WebApi.ViewModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using WebApi.Models.Property;
using WebApi.Interfaces;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : Controller
    {
        public readonly IPropertyRepository _propertyRepository;

        public PropertyController(IPropertyRepository repository)
        {
            _propertyRepository = repository;
        }

        [HttpGet]
        [Route("GetAllProperties")]
        public async Task<IActionResult> GetAllProperties()
        {
            try
            {
                var allProperties = await _propertyRepository.GetAllPropertiesAsync();
                List<PropertyResponse> properties = new List<PropertyResponse>();
                foreach (var property in allProperties)
                {
                    properties.Add(new PropertyResponse
                    {
                        PropertyID = property.PropertyID,
                        BrokerName = property.Broker.Name,
                        BuildingNumber = property.BuildingNumber,
                        Description = property.Description,
                        PurchaseAmount = property.PurchaseAmount,
                        PurchaseYear = property.PurchaseYear,
                        Size = property.Size,
                        Street = property.Street,
                        Suburb = property.Suburb,
                        Yard = property.Yard
                    });
                }

                return Ok(properties);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpPost]
        [Route("AddProperty")]
        public async Task<IActionResult> AddProperty(PropertyRequest propertyRequest)
        {
            var property = new Property
            {
                Yard = propertyRequest.Yard,
                BuildingNumber = propertyRequest.BuildingNumber,
                Description = propertyRequest.Description,
                Suburb = propertyRequest.Suburb,
                Street = propertyRequest.Street,
                Size = propertyRequest.Size,
                PurchaseYear = propertyRequest.PurchaseYear,
                BrokerID = propertyRequest.BrokerID,
                PurchaseAmount = propertyRequest.PurchaseAmount,
            };
            await _propertyRepository.AddProperty(property);
            return Ok(property);
        }

        [HttpPut]
        [Route("EditProperty")]
        public async Task<IActionResult> EditProperty(int propertyID, Property property)
        {
            try
            {
                var allProperties = await _propertyRepository.GetAllPropertiesAsync();
                var existingProperty = allProperties.FirstOrDefault(x => x.PropertyID == propertyID);
                if (existingProperty == null) return NotFound($"The Property does not exist");

                if (property.Description == "")
                {
                    existingProperty.Description = existingProperty.Description;
                }
                else
                {
                    existingProperty.Description = property.Description;
                }
                if (property.BuildingNumber == null)
                {
                    existingProperty.BuildingNumber = existingProperty.BuildingNumber;
                }
                else
                {
                    existingProperty.BuildingNumber = property.BuildingNumber;
                }
                if (property.Street == "")
                {
                    existingProperty.Street = existingProperty.Street;
                }
                else
                {
                    existingProperty.Street = property.Street;
                }

                if (property.Suburb == "")
                {
                    existingProperty.Suburb = existingProperty.Suburb;
                }
                else
                {
                    existingProperty.Suburb = property.Suburb;
                }

                if (property.PurchaseAmount == null)
                {
                    existingProperty.PurchaseAmount = existingProperty.PurchaseAmount;
                }
                else
                {
                    existingProperty.PurchaseAmount = property.PurchaseAmount;
                }

                if (property.PurchaseYear == "")
                {
                    existingProperty.PurchaseYear = existingProperty.PurchaseYear;
                }
                else
                {
                    existingProperty.PurchaseYear = property.PurchaseYear;
                }

                if (property.Size == "")
                {
                    existingProperty.Size = existingProperty.Size;
                }
                else
                {
                    existingProperty.Size = property.Size;
                }

                if (property.Yard == "")
                {
                    existingProperty.Yard = existingProperty.Yard;
                }
                else
                {
                    existingProperty.Yard = property.Yard;
                }

                if (property.BrokerID == null)
                {
                    existingProperty.BrokerID = existingProperty.BrokerID;
                }
                else
                {
                    existingProperty.BrokerID = property.BrokerID;
                }

                if (await _propertyRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingProperty);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteProperty")]
        public async Task<IActionResult> DeleteProperty(int propertyID)
        {
            try
            {
                var allProperties = await _propertyRepository.GetAllPropertiesAsync();
                var existingProperty = allProperties.FirstOrDefault(x => x.PropertyID == propertyID);

                if (existingProperty == null) return NotFound($"The customer does not exist");

                _propertyRepository.Delete(existingProperty);

                if (await _propertyRepository.SaveChangesAsync()) return Ok(existingProperty);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}