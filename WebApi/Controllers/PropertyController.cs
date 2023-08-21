using WebApi.Models;
using WebApi.ViewModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using WebApi.Models.Property;
using WebApi.Interfaces;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : Controller
    {
        public readonly IPropertyRepository _propertyRepository;
        private readonly AppDbContext _context;

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
                var results = await _propertyRepository.GetAllPropertiesAsync();
                return Ok(results);
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
            try
            {
                await _propertyRepository.AddProperty(property);

                return Ok(property);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut]
        [Route("EditProperty/{propertyID}")]
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

                if (property.PurchaseYear == null)
                {
                    existingProperty.PurchaseYear = existingProperty.PurchaseYear;
                }
                else
                {
                    existingProperty.PurchaseYear = property.PurchaseYear;
                }

                if (property.Size == 0)
                {
                    existingProperty.Size = existingProperty.Size;
                }
                else
                {
                    existingProperty.Size = property.Size;
                }

                if (property.Yard == 0)
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

        [HttpGet]
        [Route("GetPropertyByID/{propertyID}")]
        public async Task<IActionResult> GetPropertyByID(int propertyID)
        {
            try
            {
                var result = await _propertyRepository.GetPropertyByIDAsync(propertyID);
                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete]
        [Route("DeleteProperty/{propertyID}")]
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

        [HttpGet]
        [Route("GetAllInspectionsForProperty/{propertyID}")]
        public async Task<IActionResult> GetAllInspectionsForProperty(int propertyID)
        {
            try
            {
                var inspections = await _propertyRepository.GetAllInspectionsForPropertyAsync(propertyID);
                return Ok(inspections);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetAllInspections")]
        public async Task<IActionResult> GetAllInspections()
        {
            try
            {
                var inspections = await _propertyRepository.GetAllInspectionsAsync();
                return Ok(inspections);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpPost]
        [Route("AddInspection")]
        public async Task<IActionResult> AddInspection(InspectionRequest inspectionRequest)
        {
            try
            {
                var existingProperty = await _propertyRepository.GetPropertyByIDAsync(inspectionRequest.PropertyID);
                if (existingProperty == null)
                {
                    return NotFound($"The Property does not exist");
                }

                
                var inspection = new Inspection
                {
                    PropertyID = inspectionRequest.PropertyID,
                    InspectionDescription = inspectionRequest.InspectionDescription,
                    InspectionDate = inspectionRequest.InspectionDate.Date,
                    InspectionTime = inspectionRequest.InspectionTime,
                    InspectionStatusID = inspectionRequest.InspectionStatusID,
                    InspectionTypeID = inspectionRequest.InspectionTypeID,
                    // Other properties
                };

                await _propertyRepository.AddInspection(inspection);

                return Ok(inspection);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
        

        [HttpPut]
        [Route("EditInspection/{inspectionID}")]
        public async Task<IActionResult> EditInspection(int inspectionID, Inspection inspection)
        {
            try
            {
                var existingInspection = await _propertyRepository.GetInspectionByIDAsync(inspectionID);
                if (existingInspection == null) return NotFound($"The Inspection does not exist");

                // Update inspection properties here

                if (await _propertyRepository.SaveChangesAsync())
                {
                    return Ok(existingInspection);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteInspection/{inspectionID}")]
        public async Task<IActionResult> DeleteInspection(int inspectionID)
        {
            try
            {
                var existingInspection = await _propertyRepository.GetInspectionByIDAsync(inspectionID);

                if (existingInspection == null) return NotFound($"The inspection does not exist");

                _propertyRepository.DeleteInspection(existingInspection);

                if (await _propertyRepository.SaveChangesAsync())
                    return Ok(existingInspection);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpGet]
        [Route("GetAllRecoveriesForProperty/{propertyID}")]
        public async Task<IActionResult> GetAllRecoveriesForProperty(int propertyID)
        {
            try
            {
                var recoveries = await _propertyRepository.GetAllRecoveriesForPropertyAsync(propertyID);
                return Ok(recoveries);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetAllRecoveries")]
        public async Task<IActionResult> GetAllRecoveries()
        {
            try
            {
                var recoveries = await _propertyRepository.GetAllRecoveriesAsync();
                return Ok(recoveries);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpPost]
        [Route("AddRecovery")]
        public async Task<IActionResult> AddRecovery(RecoveryRequest recoveryRequest)
        {
            try
            {
                var existingProperty = await _propertyRepository.GetPropertyByIDAsync(recoveryRequest.PropertyID);
                if (existingProperty == null)
                {
                    return NotFound($"The Property does not exist");
                }

                var recovery = new Recovery
                {
                    PropertyID = recoveryRequest.PropertyID,
                    RecoveryDescription = recoveryRequest.RecoveryDescription,
                    RecoveryAmount = recoveryRequest.RecoveryAmount,
                    RecoveryTypeID = recoveryRequest.RecoveryTypeID
                };

                await _propertyRepository.AddRecovery(recovery);

                return Ok(recovery);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        [HttpPut]
        [Route("EditRecovery/{recoveryID}")]
        public async Task<IActionResult> EditRecovery(int recoveryID, Recovery recovery)
        {
            try
            {
                var existingRecovery = await _propertyRepository.GetRecoveryByIDAsync(recoveryID);
                if (existingRecovery == null) return NotFound($"The Inspection does not exist");

                // Update inspection properties here

                if (await _propertyRepository.SaveChangesAsync())
                {
                    return Ok(existingRecovery);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteRecovery/{recoveryID}")]
        public async Task<IActionResult> DeleteRecovery(int recoveryID)
        {
            try
            {
                var existingRecovery = await _propertyRepository.GetRecoveryByIDAsync(recoveryID);

                if (existingRecovery == null) return NotFound($"The inspection does not exist");

                _propertyRepository.DeleteRecovery(existingRecovery);

                if (await _propertyRepository.SaveChangesAsync())
                    return Ok(existingRecovery);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }

    /*[HttpPost]
    [Route("uploadPhoto/{propertyID}")]
    public async Task<IActionResult> UploadPhoto(int propertyID, [FromForm] IFormFile photo)
    {
        try
        {
            var property = await _context.Property.FindAsync(propertyID);

            if (property != null && photo != null)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await photo.CopyToAsync(memoryStream);
                    var photoData = memoryStream.ToArray();

                    var newPhoto = new PropertyImage
                    {
                        ImageName = photo.FileName,
                        ImageData = photoData,
                        PropertyID = propertyID
                    };

                    _context.PropertyImage.Add(newPhoto);
                    await _context.SaveChangesAsync();

                    return Ok(new { Message = "Photo uploaded successfully" });
                }
            }

            return BadRequest("Invalid property ID or photo upload failed");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }*/
}
