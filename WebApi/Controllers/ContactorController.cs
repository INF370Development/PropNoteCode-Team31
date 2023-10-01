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
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractorController : Controller
    {
        private readonly IContractorRepository _contractorRepository;
        private readonly IContractorTypeRepository _contractorTypeRepository;

        public ContractorController(IContractorRepository repository, IContractorTypeRepository contractorTypeRepository)
        {
            _contractorRepository = repository;
            _contractorTypeRepository = contractorTypeRepository;
        }

        [HttpGet]
        [Route("GetAllContractors")]
        public async Task<IActionResult> GetAllContractors()
        {
            try
            {
                List<Contractor> contractors = new();
                var results = await _contractorRepository.GetAllContractorsAsync();
                foreach (var contractor in results)
                {
                    contractors.Add(new Contractor
                    {
                        ContractorID = contractor.ContractorID,
                        UserID = contractor.UserID,
                        ContractorTypeID = contractor.ContractorTypeID,
                        AreaOfBusiness = contractor.AreaOfBusiness,
                        Availability = contractor.Availability,
                        User = contractor.User,
                        ContractorType = contractor.ContractorType,
                    });
                }
                return Ok(contractors);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetContractorByID/{contractorID}")]
        public async Task<IActionResult> GetContractorByID(int contractorID)
        {
            try
            {
                var result = await _contractorRepository.GetContractorByIDAsync(contractorID);

                if (result == null) return NotFound("Contractor does not exist. You need to create it first");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpGet("GetAllContractorTypes")]
        public async Task<ActionResult<List<ContractorType>>> GetAllContractorTypes()
        {
            try
            {
                var results = await _contractorTypeRepository.GetAllContractorTypesAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetContractorTypeByID/{ContractorTypeId}")]
        public async Task<ActionResult<ContractorType>> GetContractorTypeByID(int ContractorTypeId)
        {
            try
            {
                var result = await _contractorTypeRepository.GetContractorTypeByIDAsync(ContractorTypeId);

                if (result == null)
                {
                    return NotFound("ContractorType does not exist");
                }

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }

        [HttpPost("AddContractorType")]
        public async Task<ActionResult> AddContractorType(ContractorTypeViewModel contractorTypeModel)
        {
            var contractorType = new ContractorType
            {
                ContractorTypeName = contractorTypeModel.ContractorTypeName,
            };
            try
            {
                await _contractorTypeRepository.AddContractorType(contractorType);
                return Ok(contractorType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete]
        [Route("DeleteContractor/{contractorID}")]
        public async Task<IActionResult> DeleteContractor(int contractorID)
        {
            try
            {
                var allContractors = await _contractorRepository.GetAllContractorsAsync();
                var existingContractor = allContractors.FirstOrDefault(x => x.ContractorID == contractorID);

                if (existingContractor == null) return NotFound($"The Contractor does not exist");

                _contractorRepository.Delete(existingContractor);

                if (await _contractorRepository.SaveChangesAsync()) return Ok(existingContractor);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
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