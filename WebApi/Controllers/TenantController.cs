using WebApi.Models;
using WebApi.ViewModels;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using System.Xml.Linq;
using WebApi.Models.Users;
using WebApi.Interfaces;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TenantController : Controller
    {
        private readonly ITenantRepository _tenantRepository;
        private readonly AppDbContext _dbContext;

        public TenantController(ITenantRepository repository, AppDbContext dbContext)
        {
            _tenantRepository = repository;
            _dbContext = dbContext;
        }

        [HttpGet]
        [Route("GetAllTenants")]
        public async Task<IActionResult> GetAllTenants()
        {
            try
            {
                List<Tenant> tenants = new();
                var results = await _tenantRepository.GetAllTenantsAsync();
                foreach (var tenant in results)
                {
                    tenants.Add(new Tenant
                    {
                        TenantID = tenant.TenantID,
                        UserID = tenant.UserID,
                        Leases = tenant.Leases,
                        CompanyName = tenant.CompanyName,
                        CompanyNumber = tenant.CompanyNumber,
                        User = tenant.User,
                    });
                }
                return Ok(tenants);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetTenantByID/{tenantID}")]
        public async Task<IActionResult> GetTenantID(int tenantID)
        {
            try
            {
                var result = await _tenantRepository.GetTenantByIDAsync(tenantID);

                if (result == null) return NotFound("Tenant does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPut("UpdateTenantUser/{tenantID}")]
        public async Task<IActionResult> UpdateTenantUser(int tenantID, CreateTenantUserRequest request)
        {
            try
            {
                // Retrieve the existing Tenant by TenantID
                var existingTenant = await _tenantRepository.GetTenantByIDAsync(tenantID);

                if (existingTenant == null)
                {
                    return NotFound("Tenant not found.");
                }

                // Update Tenant's information
                existingTenant.CompanyName = request.CompanyName;
                existingTenant.CompanyNumber = request.CompanyNumber;

                // You can also update user-related properties if needed
                // existingTenant.User.Name = request.Name;

                await _tenantRepository.UpdateAsync(existingTenant);

                return Ok("Tenant User updated successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


        [HttpDelete]
        [Route("DeleteTenant/{tenantID}")]
        public async Task<IActionResult> DeleteTenant(int tenantID)
        {
            try
            {
                var allTenants = await _tenantRepository.GetAllTenantsAsync();
                var existingTenant = allTenants.FirstOrDefault(x => x.TenantID == tenantID);

                if (existingTenant == null) return NotFound($"The Tenant does not exist");

                _tenantRepository.Delete(existingTenant);

                if (await _tenantRepository.SaveChangesAsync()) return Ok(existingTenant);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpPost("UploadTenantDocument/{tenantID}")]
        public async Task<IActionResult> UploadTenantDocument(int tenantID, IFormFile file)
        {
            try
            {
                var existingTenant = await _tenantRepository.GetTenantByIDAsync(tenantID);

                if (existingTenant == null)
                {
                    return NotFound("Tenant not found.");
                }

                // Check if a file is provided
                if (file == null || file.Length == 0)
                {
                    return BadRequest("No file uploaded.");
                }

                // Generate a unique file name and save the document to the server
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                var filePath = Path.Combine("TenantDocuments", fileName); // Provide your desired directory

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Create a record for the uploaded document
                var document = new Document
                {
                    TenantID = tenantID,
                    DocumentName = fileName,
                    FilePath = filePath,
                    UploadDate = DateTime.Now,
                };

                // Save the document record to the database
                _dbContext.Document.Add(document);
                await _dbContext.SaveChangesAsync();

                return Ok("Document uploaded and linked to the tenant successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetTenantDocuments/{tenantID}")]
        public IActionResult GetTenantDocuments(int tenantID)
        {
            try
            {
                var documents = _dbContext.Document
                    .Where(d => d.TenantID == tenantID)
                    .Select(d => new
                    {
                        d.DocumentID,
                        d.DocumentName,
                        d.FilePath,
                        d.UploadDate
                    })
                    .ToList();

                return Ok(documents);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteTenantDocument/{documentID}")]
        public async Task<IActionResult> DeleteTenantDocument(int documentID)
        {
            try
            {
                var document = await _dbContext.Document.FindAsync(documentID);

                if (document == null)
                {
                    return NotFound("Document not found.");
                }

                // Delete the document file from the server
                if (System.IO.File.Exists(document.FilePath))
                {
                    System.IO.File.Delete(document.FilePath);
                }

                // Remove the document record from the database
                _dbContext.Document.Remove(document);
                await _dbContext.SaveChangesAsync();

                return Ok("Document deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }


    }
}