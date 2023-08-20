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

        public TenantController(ITenantRepository repository)
        {
            _tenantRepository = repository;
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
                        CompanyNumber = tenant.CompanyNumber
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

       

    /*[HttpPut]
        [Route("EditTenant")]
        public async Task<IActionResult> EditTenant(int tenantID, TenantViewModel tenantModel)
        {
            try
            {
                var allTenants = await _tenantRepository.GetAllTenantsAsync();
                var existingTenant = allTenants.FirstOrDefault(x => x.TenantID == tenantID);
                if (existingTenant == null) return NotFound($"The tenant does not exist");

                if (tenantModel.Email == "")
                {
                    existingTenant.Email = existingTenant.Email;
                }
                else
                {
                    existingTenant.Email = tenantModel.Email;
                }
                if (tenantModel.FirstName == "")
                {
                    existingTenant.FirstName = existingTenant.FirstName;
                }
                else
                {
                    existingTenant.FirstName = tenantModel.FirstName;
                }
                if (tenantModel.Surname == "")
                {
                    existingTenant.Surname = tenantModel.Surname;
                }
                else
                {
                    existingTenant.Surname = tenantModel.Surname;
                }
                if (tenantModel.JobTitle == "")
                {
                    existingTenant.JobTitle = tenantModel.JobTitle;
                }
                else
                {
                    existingTenant.JobTitle = tenantModel.JobTitle;
                }

                if (await _tenantRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingTenant);
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteTenant")]
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
        }*/
    }
}