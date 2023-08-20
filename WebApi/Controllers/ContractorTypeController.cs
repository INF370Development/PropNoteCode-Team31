using Microsoft.AspNetCore.Mvc;
using WebApi.Interfaces;
using WebApi.Models.Admin;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContractorTypeController : ControllerBase
    {
        private readonly IContractorTypeRepository _contractorTypeRepository;

        public ContractorTypeController(IContractorTypeRepository contractorTypeRepository)
        {
            _contractorTypeRepository = contractorTypeRepository;
        }

        [HttpGet("GetAllContractorType")]
        public async Task<ActionResult<List<ContractorType>>> GetAllContractorTypes()
        {
            try
            {
                var results = await _contractorTypeRepository.GetAllContractorTypeAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetContractorType/{ContractorTypeId}")]
        public async Task<ActionResult<ContractorType>> GetContractorType(int ContractorTypeId)
        {
            try
            {
                var result = await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);

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
        public async Task<ActionResult<ContractorType>> AddContractorType(ContractorTypeViewModel contractorType)
        {
            try
            {
                ContractorType x=new ContractorType { ContractorTypeName=contractorType.ContractorTypeName};
                await _contractorTypeRepository.AddContractorType(x);
                return Ok(x);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }
        }

        [HttpPut("EditContractorType/{ContractorTypeId}")]
        public async Task<ActionResult<ContractorType>> EditContractorType(int ContractorTypeId, ContractorTypeViewModel contractorType)
        {
            try
            {
                ContractorType existingContractorType = await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);

                if (existingContractorType == null)
                {
                    return NotFound("The Contractor Type does not exist");
                }

                existingContractorType.ContractorTypeName = contractorType.ContractorTypeName;
                await _contractorTypeRepository.EditContractorType(ContractorTypeId, contractorType);

                return Ok(existingContractorType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteContractorType/{ContractorTypeId}")]
        public async Task<IActionResult> DeleteContractorType(int ContractorTypeId)
        {
            try
            {
                ContractorType existingContractorType = await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);

                if (existingContractorType == null)
                {
                    return NotFound("The Contractor Type does not exist");
                }

                await _contractorTypeRepository.DeleteContractorTypeAsync(existingContractorType);
                return Ok(existingContractorType);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
    }
}
