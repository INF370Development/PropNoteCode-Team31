using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Lease;
using WebApi.Interfaces;
using WebApi.Models.Users;

namespace WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class LeaseController : Controller
    {
        public readonly ILeaseRepository _leaseRepository;

        public LeaseController(ILeaseRepository LeaseRepository)
        {
            _leaseRepository = LeaseRepository;
        }

        [HttpGet]
        [Route("GetAllLeases")]
        public async Task<IActionResult> GetAllLeases()
        {
            try
            {
                var allLeases = await _leaseRepository.GetAllLeasesAsync();
                List<LeaseResponse> leases = new List<LeaseResponse>();
                foreach (var lease in allLeases)
                {
                    leases.Add(new LeaseResponse
                    {
                        StartDate = lease.StartDate,
                        EndDate = lease.EndDate,
                        PropertyDescription = lease.Property.Description,
                        TenantID = lease.TenantID,
                        MonthlyAmount = lease.MonthlyAmount,
                    });
                }

                return Ok(leases);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }
        
        [HttpPost]
        [Route("AddLease")]
        public async Task<IActionResult> AddLease(LeaseRequest leaseRequest)
        {

            var lease = new Lease
            {
                StartDate = leaseRequest.StartDate,
                EndDate = leaseRequest.EndDate,
                TenantID = leaseRequest.TenantID,
                PropertyID = leaseRequest.PropertyID,
                MonthlyAmount = leaseRequest.MonthlyAmount,
            };
            await _leaseRepository.AddLease(lease);
            return Ok(lease);
        }
        [HttpPut]
        [Route("EditLease")]
        public async Task<IActionResult> EditLease(int leaseID, Lease lease)
        {

            try
            {
                var allLeases = await _leaseRepository.GetAllLeasesAsync();
                var existingLease = allLeases.FirstOrDefault(x => x.LeaseID == leaseID);
                if (existingLease == null) return NotFound($"The lease does not exist");

                if (lease.StartDate == null)
                {
                    existingLease.StartDate = existingLease.StartDate;
                }
                else
                {
                    existingLease.StartDate = lease.StartDate;
                }
                if (lease.EndDate == null)
                {
                    existingLease.EndDate = existingLease.EndDate;
                }
                else
                {
                    existingLease.EndDate = lease.EndDate;
                }
                if (lease.MonthlyAmount == null)
                {
                    existingLease.MonthlyAmount = existingLease.MonthlyAmount;
                }
                else
                {
                    existingLease.MonthlyAmount = lease.MonthlyAmount;
                }

                if (lease.TenantID == null)
                {
                    existingLease.TenantID = existingLease.TenantID;
                }
                else
                {
                    existingLease.TenantID = lease.TenantID;
                }

                if (await _leaseRepository.SaveChangesAsync() == true)
                {
                    return Ok(existingLease);
                }

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid");
        }

        [HttpDelete]
        [Route("DeleteLease")]
        public async Task<IActionResult> DeleteLease(int leaseID)
        {
            try
            {
                var allLeases = await _leaseRepository.GetAllLeasesAsync();
                var existingLease = allLeases.FirstOrDefault(x => x.LeaseID == leaseID);

                if (existingLease == null) return NotFound($"The customer does not exist");

                _leaseRepository.Delete(existingLease);

                if (await _leaseRepository.SaveChangesAsync()) return Ok(existingLease);

            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
            return BadRequest("Your request is invalid.");
        }
    }
}

