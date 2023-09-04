using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mail;
using System.Net;
using System.Security.Cryptography;
using System.Text;
using WebApi.Models;
using WebApi.Models.Interfaces;
using WebApi.Models.Users;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models.Users.Requests;
using WebApi.Models.Users.Responses;
using Microsoft.AspNetCore.Authorization;

namespace WebApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private const string AllowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly ITenantRepository _tenantRepository;
        private readonly IContractorRepository _contractorRepository;

        //Constructor for the User Controller
        public UserController(IUserRepository userRepository, IUserRoleRepository userRoleRepository, ITenantRepository tenantRepository, IContractorRepository contractorRepository)
        {
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
            _tenantRepository = tenantRepository;
            _contractorRepository = contractorRepository;
        }

        [HttpPost("CreateTenantUser")]
        public async Task<IActionResult> CreateTenantUser(CreateTenantUserRequest request)
        {
            try
            {
                // Create User
                var user = new User
                {
                    Username = request.Username,
                    Password = request.Password,
                    ProfilePhoto = request.ProfilePhoto,
                    Email = request.Email,
                    Name = request.Name,
                    Surname = request.Surname,
                    PhoneNumber = request.PhoneNumber
                    // Populate other user properties
                };

                // Get or create Tenant role
                var tenantRole = await _userRoleRepository.GetRoleByNameAsync("Tenant");
                if (tenantRole == null)
                {
                    tenantRole = new Role { Name = "Tenant" };
                    await _userRoleRepository.AddAsync(tenantRole);
                }

                await _userRepository.AddAsync(user);

                // Create UserRole
                var userRole = new UserRole
                {
                    RoleID = tenantRole.RoleID,
                    UserID = user.UserID
                };

                await _userRoleRepository.AddUserRoleAsync(userRole);
                var retrievedUser = await _userRepository.GetUserByIDAsync(user.UserID);

                // Create Tenant
                var tenant = new Tenant
                {
                    UserID = user.UserID,
                    CompanyName = request.CompanyName,
                    CompanyNumber = request.CompanyNumber,
                    User = retrievedUser,
                };
                await _tenantRepository.AddAsync(tenant);
                Console.WriteLine(tenant);

                return Ok("User with Tenant role and linked Tenant created.");

                Console.WriteLine(tenant.User);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var results = await _userRepository.GetAllUsersAsync();
                return Ok(results);
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error, please contact support");
            }
        }

        [HttpPost("CreateContractorUser")]
        public async Task<IActionResult> CreateContractorUser(CreateContractorUserRequest request)
        {
            try
            {
                // Create User
                var user = new User
                {
                    Username = request.Username,
                    Password = request.Password,
                    ProfilePhoto = request.ProfilePhoto,
                    Email = request.Email,
                    Name = request.Name,
                    Surname = request.Surname,
                    PhoneNumber = request.PhoneNumber
                    // Populate other user properties
                };

                // Get or create Tenant role
                var contractorRole = await _userRoleRepository.GetRoleByNameAsync("Contractor");
                if (contractorRole == null)
                {
                    contractorRole = new Role { Name = "Contractor" };
                    await _userRoleRepository.AddAsync(contractorRole);
                }

                await _userRepository.AddAsync(user);

                // Create UserRole
                var userRole = new UserRole
                {
                    RoleID = contractorRole.RoleID,
                    UserID = user.UserID
                };

                await _userRoleRepository.AddUserRoleAsync(userRole);
                var retrievedUser = await _userRepository.GetUserByIDAsync(user.UserID);

                // Create Tenant
                var contractor = new Contractor
                {
                    UserID = user.UserID,
                    AreaOfBusiness = request.AreaOfBusiness,
                    Availability = request.Availability,
                    ContractorTypeID = request.ContractorTypeID,
                    User = retrievedUser
                };
                Console.WriteLine("Received ContractorTypeID: " + request.ContractorTypeID);

                await _contractorRepository.AddAsync(contractor);
                Console.WriteLine(contractor);

                return Ok("User with Contractor role and linked Contractor created.");

                Console.WriteLine(contractor.User);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        [HttpGet("GetUserInformation")]
        public async Task<IActionResult> GetUserInformation(int userId)
        {
            return Ok(await _userRepository.GetUserByIDAsync(userId));
        }
    }
}