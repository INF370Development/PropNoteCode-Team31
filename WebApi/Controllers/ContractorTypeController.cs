using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Components.Forms;
using System.Reflection.Metadata.Ecma335;
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

        [HttpGet]
        [Route("GetAllContractorType")]
        public async Task<IActionResult> GetAllContractorTypes()
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

        [HttpGet]
        [Route("GetContractorType/{ContractorTypeId}")]
        public async Task<IActionResult> GetContractorType(int ContractorTypeId)
        {
            try
            {
                var result = await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);

                if (result == null) return NotFound("ContractorType does not exist");

                return Ok(result);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support");
            }
        }
        [HttpPost]
        [Route("AddContractorType")]
        public async Task<IActionResult> AddContractorType(string cvm)
        {
            var contractorType = new ContractorType 
            { ContractorTypeName = cvm, };

            try
            {
                await _contractorTypeRepository.AddContractorType(contractorType);
            }
            catch (Exception)
            {
                return BadRequest("Invalid transaction");
            }

            return Ok(contractorType);
        }

        [HttpPut]
        [Route("EditContractorType/{ContractorTypeId}")]
        public async Task<ActionResult> EditContractorType(int ContractorTypeId, string contractorType)
        {
            try
            {
                ContractorType existingContractorType = (ContractorType)await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);
                if (existingContractorType == null) return NotFound("The Contractor Type does not exist");
                return Ok(await _contractorTypeRepository.EditContractorType(ContractorTypeId,contractorType));
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

        [HttpDelete]
        [Route("DeleteContractorType/{ContractorTypeId}")]
        public async Task<IActionResult> DeleteContractorType(int ContractorTypeId)
        {
            try
            {
                ContractorType existingContractorType = (ContractorType)await _contractorTypeRepository.GetContractorTypeByID(ContractorTypeId);
                if (existingContractorType == null) return NotFound($"The Contractor Type does not exist");
                return Ok(await _contractorTypeRepository.DeleteContractorTypeAsync(existingContractorType));

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }

    }
}
