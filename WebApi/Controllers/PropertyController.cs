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
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using Azure.Storage.Blobs;
using Microsoft.Extensions.Configuration;
using Azure.Storage.Blobs.Models; // For BlobItem
using System.Linq; // For LINQ extensions

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertyController : Controller
    {
        public readonly IPropertyRepository _propertyRepository;
        private readonly AppDbContext _context;
        private readonly BlobServiceClient _blobServiceClient;

        public PropertyController(IPropertyRepository repository, AppDbContext context, BlobServiceClient blobServiceClient)
        {
            _propertyRepository = repository;
            _context = context;
            _blobServiceClient = blobServiceClient;
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
        [Route("AddInspection/{propertyID}")]
        public async Task<IActionResult> AddInspection(int propertyID, [FromBody] InspectionRequest inspectionRequest)
        {
            try
            {
                var property = await _context.Property.FindAsync(propertyID);
                if (property == null)
                {
                    return NotFound($"The Property does not exist");
                }

                // Assuming inspectionRequest.InspectionDate is the date you receive from the frontend
                DateTime receivedDate = inspectionRequest.InspectionDate;

                // Add one day to the received date
                DateTime adjustedDate = receivedDate.AddDays(1);

                TimeSpan inspectionTimeSpan;
                if (TimeSpan.TryParse(inspectionRequest.InspectionTime, out inspectionTimeSpan))
                {
                    var inspection = new Inspection
                    {
                        PropertyID = propertyID,
                        InspectionDescription = inspectionRequest.InspectionDescription,
                        InspectionDate = adjustedDate,
                        InspectionTime = inspectionTimeSpan, // Set the parsed TimeSpan
                        InspectionStatusID = inspectionRequest.InspectionStatusID,
                        InspectionTypeID = inspectionRequest.InspectionTypeID,
                        // Other properties
                    };

                    await _propertyRepository.AddInspection(inspection);

                    return Ok(inspection);
                }
                else
                {
                    // Handle parsing error
                    return BadRequest("Invalid InspectionTime format");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut("EditInspection/{inspectionID}")]
        public IActionResult EditInspection(int inspectionID, [FromBody] InspectionRequest updatedInspection)
        {
            var existingInspection = _context.Inspection.FirstOrDefault(i => i.InspectionID == inspectionID);

            if (existingInspection != null)
            {
                // Parse the updated inspection time string to TimeSpan
                TimeSpan inspectionTimeSpan;
                if (TimeSpan.TryParse(updatedInspection.InspectionTime, out inspectionTimeSpan))
                {
                    // Update properties of the existing inspection based on updatedInspection
                    existingInspection.InspectionDescription = updatedInspection.InspectionDescription;
                    existingInspection.InspectionDate = updatedInspection.InspectionDate;
                    existingInspection.InspectionTime = inspectionTimeSpan; // Assign the parsed TimeSpan
                    existingInspection.InspectionStatusID = updatedInspection.InspectionStatusID;
                    existingInspection.InspectionTypeID = updatedInspection.InspectionTypeID;

                    // Save changes to the database
                    _context.SaveChanges();

                    // Return a success response, e.g., 200 OK
                    return Ok();
                }
                else
                {
                    // Handle the case where parsing the time string fails
                    return BadRequest("Invalid InspectionTime format");
                }
            }
            else
            {
                // Inspection with the specified ID not found
                return NotFound();
            }
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
        [Route("AddRecovery/{propertyID}")]
        public async Task<IActionResult> AddRecovery(int propertyID, RecoveryRequest recoveryRequest)
        {
            try
            {
                var property = await _context.Property.FindAsync(propertyID);
                if (property == null)
                {
                    return NotFound($"The Property with ID {propertyID} does not exist");
                }

                var recovery = new Recovery
                {
                    PropertyID = propertyID, // Set the PropertyID to the input ID
                    RecoveryDescription = recoveryRequest.RecoveryDescription,
                    RecoveryAmount = recoveryRequest.RecoveryAmount,
                    RecoveryTypeID = recoveryRequest.RecoveryTypeID
                };

                // Assuming _propertyRepository.AddRecovery handles saving to the database
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

        [HttpGet("GetAllInspectionTypes")]
        public async Task<ActionResult<List<InspectionType>>> GetAllInspectionTypes()
        {
            try
            {
                var results = await _propertyRepository.GetAllInspectionTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetAllInspectionStatuses")]
        public async Task<ActionResult<List<InspectionStatus>>> GetAllInspectionStatuses()
        {
            try
            {
                var results = await _propertyRepository.GetAllInspectionStatusesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetAllRecoveryTypes")]
        public async Task<ActionResult<List<RecoveryType>>> GetAllRecoveryTypes()
        {
            try
            {
                var results = await _propertyRepository.GetAllRecoveryTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("AddInspectionType")]
        public async Task<ActionResult> AddInspectionType(InspectionTypeRequest inspectionTypeRequest)
        {
            var inspectionType = new InspectionType
            {
                InspectionTypeName = inspectionTypeRequest.InspectionTypeName,
            };
            try
            {
                await _propertyRepository.AddInspectionType(inspectionType);
                return Ok(inspectionType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("AddInspectionStatus")]
        public async Task<ActionResult> AddInspectionStatus(InspectionStatusRequest inspectionStatusRequest)
        {
            var inspectionStatus = new InspectionStatus
            {
                InspectionStatusName = inspectionStatusRequest.InspectionStatusName,
            };
            try
            {
                await _propertyRepository.AddInspectionStatus(inspectionStatus);
                return Ok(inspectionStatus);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("AddRecoveryType")]
        public async Task<ActionResult> AddRecoveryType(RecoveryTypeRequest recoveryTypeRequest)
        {
            var recoveryType = new RecoveryType
            {
                RecoveryTypeDescription = recoveryTypeRequest.RecoveryTypeDescription,
            };
            try
            {
                await _propertyRepository.AddRecoveryType(recoveryType);
                return Ok(recoveryType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("AddProblemStatus")]
        public async Task<ActionResult> AddProblemStatus(ProblemStatusRequest problemStatusRequest)
        {
            var problemStatus = new ProblemStatus
            {
                ProblemStatusName = problemStatusRequest.ProblemStatusName,
            };
            try
            {
                await _propertyRepository.AddProblemStatus(problemStatus);
                return Ok(problemStatus);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
        [Route("AddProblem/{inspectionID}")]
        public async Task<IActionResult> AddProblem(int inspectionID, ProblemRequest problemRequest)
        {
            try
            {
                var inspection = await _context.Inspection.FindAsync(inspectionID);
                if (inspection == null)
                {
                    return NotFound($"The Property with ID {inspectionID} does not exist");
                }

                var problem = new Problem
                {
                    InspectionID = inspectionID,
                    ProblemDate = DateTime.Now,
                    ProblemDescription = problemRequest.ProblemDescription,
                    ProblemSeverity = problemRequest.ProblemSeverity,
                    ProblemStatusID = problemRequest.ProblemStatusID,
                    ProblemSubject = problemRequest.ProblemSubject,
                };

                // Assuming _propertyRepository.AddRecovery handles saving to the database
                await _propertyRepository.AddProblem(problem);

                return Ok(problem);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPut]
        [Route("EditProblem/{problemID}")]
        public async Task<IActionResult> EditProblem(int problemID, ProblemRequest problemRequest)
        {
            try
            {
                var existingProblem = await _propertyRepository.GetProblemByIDAsync(problemID);
                if (existingProblem == null) return NotFound($"The Problem does not exist");

                // Update inspection properties here based on problemRequest
                existingProblem.InspectionID = existingProblem.InspectionID;
                existingProblem.ProblemDate = DateTime.Now;
                existingProblem.ProblemSubject = problemRequest.ProblemSubject;
                existingProblem.ProblemDescription = problemRequest.ProblemDescription;
                existingProblem.ProblemSeverity = problemRequest.ProblemSeverity;
                existingProblem.ProblemStatusID = problemRequest.ProblemStatusID;
                // Update other properties as needed

                if (await _propertyRepository.SaveChangesAsync())
                {
                    return Ok(existingProblem);
                }
                else
                {
                    return StatusCode(500, "Failed to save changes.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpGet("GetProblemStatus/{problemStatusID}")]
        public async Task<IActionResult> GetProblemStatus(int problemStatusID)
        {
            try
            {
                // Retrieve the ProblemStatus from your data source by problemStatusID
                var problemStatus = await _context.ProblemStatus.FindAsync(problemStatusID);

                if (problemStatus == null)
                {
                    return NotFound($"ProblemStatus with ID {problemStatusID} not found");
                }

                // Return the ProblemStatus
                return Ok(problemStatus);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetAllProblemStatuses")]
        public async Task<ActionResult<IEnumerable<ProblemStatus>>> GetAllProblemStatuses()
        {
            try
            {
                var problemStatuses = await _propertyRepository.GetAllProblemStatusesAsync();
                return Ok(problemStatuses);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetAllProblemsForInspection/{inspectionID}")]
        public async Task<IActionResult> GetAllProblemsForInspection(int inspectionID)
        {
            try
            {
                // Retrieve all problems associated with the given inspection ID
                var problems = await _context.Problem
                    .Where(p => p.InspectionID == inspectionID)
                    .Include(x => x.Inspection)
                    .ToListAsync();

                if (problems == null || !problems.Any())
                {
                    // Return a custom response object indicating no problems found
                    return Ok(new { message = "No problems found for the specified inspection." });
                }

                return Ok(problems);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

        [HttpDelete("DeleteProblem/{problemID}")]
        public async Task<IActionResult> DeleteProblem(int problemID)
        {
            try
            {
                // Find the problem to delete by ID
                var problemToDelete = await _context.Problem.FindAsync(problemID);

                if (problemToDelete == null)
                {
                    return NotFound("Problem not found.");
                }

                // Delete the Blob Storage container associated with the problem
                var containerName = $"problem-{problemID}";
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);

                if (await containerClient.ExistsAsync())
                {
                    await containerClient.DeleteAsync();
                }

                // Remove the problem from the database
                _context.Problem.Remove(problemToDelete);
                await _context.SaveChangesAsync();

                return Ok("Problem and associated Blob Storage container deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error: " + ex.Message);
            }
        }

        [HttpGet]
        [Route("GetPropertyImagesByPropertyID/{propertyID}")]
        public async Task<IActionResult> GetPropertyImagesByPropertyID(int propertyID)
        {
            try
            {
                var propertyImages = await _context.PropertyImage
                    .Where(pi => pi.PropertyID == propertyID)
                    .ToListAsync();

                return Ok(propertyImages);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost]
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
                        string base64 = Convert.ToBase64String(photoData);

                        var newPhoto = new PropertyImage
                        {
                            ImageName = photo.FileName,
                            ImageData = base64,
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
        }

        [HttpPost("uploadProblemPhoto/{problemID}")]
        public async Task<IActionResult> UploadProblemPhoto(int problemID, [FromForm] ProblemPhotoUploadModel model)
        {
            try
            {
                var problem = await _propertyRepository.GetProblemByIDAsync(problemID);

                if (problem == null)
                {
                    return NotFound("Problem Not Found");
                }

                if (model.Photo == null || model.Photo.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                if (problem != null && model.Photo != null)
                {
                    using (var memoryStream = new MemoryStream())
                    {
                        await model.Photo.CopyToAsync(memoryStream);
                        var photoData = memoryStream.ToArray();
                        string base64 = Convert.ToBase64String(photoData);

                        var newPhoto = new ProblemImage
                        {
                            ImageName = model.Photo.FileName,
                            ImageData = base64,
                            ProblemID = problemID,
                        };

                        _context.ProblemImage.Add(newPhoto);
                        await _context.SaveChangesAsync();

                        return Ok(new { Message = "Photo uploaded successfully" });
                    }
                }

                return BadRequest("Invalid problem ID or photo upload failed");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("GetProblemImages/{problemID}")]
        public async Task<IActionResult> GetProblemImages(int problemID)
        {
            try
            {
                var problemImages = await _context.ProblemImage
                    .Where(pi => pi.ProblemID == problemID)
                    .ToListAsync();

                return Ok(problemImages);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error. Please contact support.");
            }
        }

        [HttpPost("uploadProblemVideo/{problemID}")]
        public async Task<IActionResult> UploadProblemVideo(int problemID, [FromForm] ProblemVideoUploadModel model)
        {
            try
            {
                var problem = await _propertyRepository.GetProblemByIDAsync(problemID);
                if (problem == null)
                {
                    return NotFound("Problem Not Found");
                }

                if (model.Video == null || model.Video.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                // Create a unique container for the problem using its ID
                string blobStorageBaseUrl = $"https://propnotestorage.blob.core.windows.net/";
                var containerName = $"problem-{problemID}";
                var containerClient = _blobServiceClient.GetBlobContainerClient(containerName);
                var videoUrl = $"{blobStorageBaseUrl}{containerName}/{model.Video.FileName}";

                // Check if the container exists; if not, create it
                if (!await containerClient.ExistsAsync())
                {
                    await containerClient.CreateAsync(PublicAccessType.BlobContainer);
                }

                var blobClient = containerClient.GetBlobClient(model.Video.FileName);

                using (var stream = model.Video.OpenReadStream())
                {
                    await blobClient.UploadAsync(stream, true);
                }

                // Save video metadata to the database
                var video = new ProblemVideo
                {
                    FileName = model.Video.FileName,
                    ContentType = model.Video.ContentType,
                    ProblemID = problemID,
                    VideoURL = videoUrl,
                    // Set other metadata fields as needed
                };

                _context.ProblemVideo.Add(video);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Video uploaded successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("GetProblemVideos/{problemID}")]
        public IActionResult GetProblemVideos(int problemID)
        {
            try
            {
                // Assuming you have an Entity Framework DbContext instance called "_context"
                var videos = _context.ProblemVideo
                    .Where(video => video.ProblemID == problemID)
                    .Select(video => new ProblemVideoModel
                    {
                        FileName = video.FileName,
                        ContentType = video.ContentType,
                        VideoURL = video.VideoURL // Assuming you store video URLs in the VideoURL property
                    })
                    .ToList();

                if (videos == null || videos.Count == 0)
                {
                    return NotFound("No videos found for the specified ProblemID.");
                }

                return Ok(videos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}