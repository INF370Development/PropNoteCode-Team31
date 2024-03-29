﻿using WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models.Lease;
using WebApi.Interfaces;
using WebApi.Models.Users;
using Microsoft.AspNetCore.Authorization;
using WebApi.Models.Property;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaseController : Controller
    {
        public readonly ILeaseRepository _leaseRepository;
        public readonly IPropertyRepository _propertyRepository;

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
                List<Lease> leases = new List<Lease>();
                foreach (var lease in allLeases)
                {
                    leases.Add(new Lease
                    {
                        EndDate = lease.EndDate,
                        MonthlyAmount = lease.MonthlyAmount,
                        StartDate = lease.StartDate,
                        LeaseID = lease.LeaseID,
                        TenantID = lease.TenantID,
                        PropertyID = lease.PropertyID,
                    }); ;
                }

                return Ok(leases);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpGet]
        [Route("GetLeasesByTenantID/{tenantID}")]
        public async Task<IActionResult> GetLeasesByTenantID(int tenantID)
        {
            try
            {
                // Retrieve leases that match the provided TenantID
                var leases = await _leaseRepository.GetLeasesByTenantIDAsync(tenantID);

                if (leases == null || !leases.Any())
                {
                    return NotFound("No leases found for this tenant.");
                }

                // Optionally, you can project the leases to a DTO or ViewModel if needed
                var lease = leases.Select(lease => new Lease
                {
                    EndDate = lease.EndDate,
                    MonthlyAmount = lease.MonthlyAmount,
                    StartDate = lease.StartDate,
                    LeaseID = lease.LeaseID,
                    TenantID = lease.TenantID,
                    PropertyID = lease.PropertyID,
                }).ToList();

                return Ok(leases);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }
        [HttpGet("GetPropertyByLeaseID/{leaseID}")]
        public async Task<ActionResult<Property>> GetPropertyByLeaseIDAsync(int leaseID)
        {
            var property = await _leaseRepository.GetPropertyByLeaseIDAsync(leaseID);
            if (property == null)
            {
                return NotFound("Property not found for the provided lease ID.");
            }

            return Ok(property);
        }


        [HttpPost]
        [Route("AddLease")]
        public async Task<IActionResult> AddLease(LeaseRequest leaseRequest)
        {
            try
            {
                // Retrieve the existing leases for the property
                var existingLeases = await _leaseRepository.GetLeasesByPropertyIDAsync(leaseRequest.PropertyID);

                // Check for overlaps
                if (IsOverlappingLease(existingLeases, leaseRequest))
                {
                    return StatusCode(409, "There is an overlapping lease on the same property.");
                }

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
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        private bool IsOverlappingLease(List<Lease> existingLeases, LeaseRequest newLease)
        {
            foreach (var existingLease in existingLeases)
            {
                if (existingLease.StartDate < newLease.EndDate && existingLease.EndDate > newLease.StartDate)
                {
                    return true; // There is an overlap
                }
            }
            return false; // No overlap
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
        [Route("DeleteLease/{leaseId}")]
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

        [HttpGet("GetLeaseById/{leaseId}")]
        public async Task<IActionResult> GetLeaseById(int leaseId)
        {
            try
            {
                var lease = await _leaseRepository.GetLeaseByID(leaseId);
                if (lease == null)
                {
                    return NotFound("Lease not found");
                }

                // You can customize the data you want to return here, or return the entire lease object.
                var leaseResponse = new
                {
                    LeaseID = lease.LeaseID,
                    StartDate = lease.StartDate,
                    EndDate = lease.EndDate,
                    MonthlyAmount = lease.MonthlyAmount,
                    TenantID = lease.TenantID,
                    PropertyID = lease.PropertyID,
                    // Include other properties as needed
                };

                return Ok(leaseResponse);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpPost("{leaseId}/AddDeposit")]
        public async Task<IActionResult> AddDeposit(int leaseId, [FromBody] DepositRequest depositRequest)
        {
            try
            {
                var lease = await _leaseRepository.GetLeaseByID(leaseId);
                if (lease == null)
                {
                    return NotFound("Lease not found");
                }

                var deposit = new Deposit
                {
                    LeaseID = leaseId,
                    Amount = depositRequest.Amount,
                };

                await _leaseRepository.AddDeposit(deposit);

                return Ok(deposit);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpPut]
        [Route("EditDeposit")]
        public async Task<IActionResult> EditDeposit(int depositId, DepositRequest depositRequest)
        {
            try
            {
                var existingDeposit = await _leaseRepository.GetDepositByIdAsync(depositId);
                if (existingDeposit == null)
                {
                    return NotFound("Deposit not found");
                }

                // Update the existing deposit properties
                existingDeposit.Amount = depositRequest.Amount;

                if (await _leaseRepository.EditDepositAsync(depositId, existingDeposit))
                {
                    return Ok(existingDeposit);
                }
                else
                {
                    return BadRequest("Failed to update deposit");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpDelete("DeleteDeposit/{depositId}")]
        public async Task<IActionResult> DeleteDeposit(int depositId)
        {
            try
            {
                var existingDeposit = await _leaseRepository.GetDepositByID(depositId);
                if (existingDeposit == null)
                {
                    return NotFound("Deposit not found");
                }

                _leaseRepository.DeleteDepositAsync(depositId);
                await _leaseRepository.SaveChangesAsync();

                return Ok("Deposit deleted successfully");
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("GetAllDeposits")]
        public async Task<IActionResult> GetAllDeposits()
        {
            try
            {
                var deposits = await _leaseRepository.GetAllDepositsAsync();

                return Ok(deposits);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("{leaseId}/GetAllDepositsByLease")]
        public async Task<IActionResult> GetAllDepositsByLease(int leaseId)
        {
            try
            {
                var lease = await _leaseRepository.GetLeaseByID(leaseId);
                if (lease == null)
                {
                    return NotFound("Lease not found");
                }

                var deposits = await _leaseRepository.GetAllDepositsByLeaseAsync(leaseId);

                return Ok(deposits);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error, please contact support");
            }
        }

        [HttpGet("GetPropertiesForTenant/{tenantID}")]
        public async Task<IActionResult> GetPropertiesForTenant(int tenantID)
        {
            try
            {
                var leases = await _leaseRepository.GetLeasesByTenantID(tenantID);

                if (leases == null || !leases.Any())
                {
                    return NotFound("No properties found for this tenant.");
                }

                var propertyIDs = leases.Select(l => l.PropertyID).ToList();

                var properties = await _propertyRepository.GetPropertiesByIDs(propertyIDs);

                return Ok(properties);
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }
    }
}