using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebApi.Helpers;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Interfaces;
using WebApi.Models.Users.Requests;
using WebApi.Models.Users.Responses;
using WebApi.Repositories;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    public class AuthenticationController : Controller
    {
        private const string AllowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;
        private readonly IConfiguration _config;
        private readonly AppDbContext _context;

        public AuthenticationController(IUserRepository userRepository, IUserRoleRepository userRoleRepository, IConfiguration config, AppDbContext context)
        {
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
            _config = config;
            _context = context;
        }

        //Loging Function
        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] LoginDetailsRequest userLoginDetails)
        {
            try
            {
                string hashedPassword = GenerateHash(ApplySomeSalt(userLoginDetails.Password!));
                //Search User in database
                var foundUser = await _userRepository.GetUserByUserName(userLoginDetails.Username!);
                if (foundUser == null)
                {
                    var result = new RegisterUserResponse()
                    {
                        IsSuccess = false,
                    };
                    return Ok(result);
                }
                else
                {
                    //Check the entered password against the saved password in the database.
                    var passwordCheckResult = await _userRepository.CheckUserPassword(foundUser.Username, hashedPassword);
                    if (passwordCheckResult)
                    {   //Successful Login
                        var userRoleName = await _userRoleRepository.GetUserRoleIdByUserId(foundUser.UserID);
                        //Check for First Time login
                        if (foundUser.HasLoggedIn == false)
                        {
                            var FirstLoginResult = new RegisterUserResponse()
                            {
                                Username = foundUser.Username,
                                UserID = foundUser.UserID,
                                Email = foundUser.Email,
                                Name = foundUser.Name,
                                UserRoleName = userRoleName,
                                IsSuccess = true,
                                HasLoggedIn = false,
                                SecurityToken = GenerateTokenLogin(userRoleName, foundUser.UserID),
                            };
                            return StatusCode(StatusCodes.Status200OK, FirstLoginResult);
                        }
                        else
                        {
                            var result = new RegisterUserResponse()
                            {
                                Username = foundUser.Username,
                                UserID = foundUser.UserID,
                                Email = foundUser.Email,
                                Name = foundUser.Name,
                                UserRoleName = userRoleName,
                                IsSuccess = true,
                                SecurityToken = GenerateTokenLogin(userRoleName, foundUser.UserID),
                                HasLoggedIn = true,
                            };
                            return StatusCode(StatusCodes.Status200OK, result);
                        }
                    }
                    else
                    {
                        var result = new RegisterUserResponse()
                        {
                            IsSuccess = false,
                        };
                        return Ok(result);
                    }
                }
            }
            catch
            {
                var result = new RegisterUserResponse()
                {
                    IsSuccess = false,
                };
                return Ok(result);
            }
        }

        [HttpGet("GetTenantIDForCurrentUser/{userID}")]
        public async Task<IActionResult> GetTenantIDForCurrentUser(int userID)
        {
            try
            {
                // Query your database to find the TenantID associated with the provided UserID
                var tenant = await _context.Tenant.FirstOrDefaultAsync(t => t.UserID == userID);

                if (tenant != null)
                {
                    return Ok(tenant.TenantID); // Return the TenantID
                }
                else
                {
                    // If no TenantID is found, return a NotFound result or appropriate response
                    return NotFound("No TenantID found for the provided user ID.");
                }
            }
            catch (Exception)
            {
                return StatusCode(500, "Internal Server Error. Please contact support.");
            }
        }

        //Generate JwtToken
        [AllowAnonymous]
        [HttpGet]
        [Route("GenerateJwtToken")]
        public async Task<IActionResult> GenerateTokenTest(string UserRoleName, int UserId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:Key"]!));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
            new Claim("UserRole", UserRoleName),
            new Claim("UserId", UserId.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["JWTSettings:Issuer"],
                Audience = _config["JWTSettings:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(20),
                SigningCredentials = signingCredentials,
                Subject = new ClaimsIdentity(claims) // Set the claims for the token
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            return Ok(tokenString);
        }

        private string GenerateTokenLogin(string UserRoleName, int UserId)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWTSettings:Key"]!));
            var signingCredentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim("UserRole", UserRoleName),
                new Claim("UserId", UserId.ToString()),
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Issuer = _config["JWTSettings:Issuer"],
                Audience = _config["JWTSettings:Audience"],
                Expires = DateTime.UtcNow.AddMinutes(60),
                SigningCredentials = signingCredentials,
                Subject = new ClaimsIdentity(claims) // Set the claims for the token
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        //Create new User
        [HttpPost]
        [Route("CreateNewUser")]
        public async Task<IActionResult> CreateNewUser([FromBody] RegisterUserRequest userDetails)
        {
            try
            {
                bool Userexsists = await _userRepository.CheckIfUserNameExsists(userDetails.Username!);
                if (Userexsists == true)
                {
                    return StatusCode(StatusCodes.Status451UnavailableForLegalReasons, "Username Already Exsists.");
                }
                else
                {
                    User newUser = new User();
                    //TODO Replace once done Developing
                    //string pass = GenerateRandomPassword(8);
                    string pass = "123";
                    var hashedPassword = GenerateHash(ApplySomeSalt(pass));
                    newUser.Password = hashedPassword;
                    newUser.Username = userDetails.Username;
                    newUser.Email = userDetails.Email;
                    newUser.Name = userDetails.Name;
                    newUser.HasLoggedIn = false;
                    _userRepository.Add(newUser);
                    await _userRepository.SaveChangesAsync();
                    var foundUser = await _userRepository.GetUserByUserName(newUser.Username);
                    var userRole = await _userRoleRepository.GetRoleByNameAsync(userDetails.userRole);
                    var newUserDetailsFound = await _userRepository.GetUserByUserName(newUser.Username)!;

                    //Insert UserRole Link
                    var newUserRole = new UserRole
                    {
                        RoleID = userRole.RoleID,
                        UserID = newUserDetailsFound.UserID
                    };

                    await _userRoleRepository.AddUserRoleAsync(newUserRole);
                    await _userRoleRepository.SaveChangesAsync();

                    //Return Result
                    var result = new RegisterUserResponse()
                    {
                        Username = newUser.Username,
                        UserID = foundUser!.UserID,
                        Email = newUser.Email,
                        Name = newUser.Name,
                        UserRoleName = userDetails.userRole,
                        IsSuccess = true,
                    };

                    //Send email to User
                    var emailHelper = new EmailHelper();
                    emailHelper.SendEmail(newUser.Username, newUser.Email, pass, newUser.Name!);

                    return Ok(result);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "User Creation Failed.");
            }
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("UpdateNewUser")]
        public async Task<IActionResult> UpdateUserDetails([FromBody] User userDetailsRequest)
        {
            try
            {
                var request = new User
                {
                    Email = userDetailsRequest.Email,
                    HasLoggedIn = true,
                    Name = userDetailsRequest.Name,
                    Password = GenerateHash(ApplySomeSalt(userDetailsRequest.Password)),
                    PhoneNumber = userDetailsRequest.PhoneNumber,
                    ProfilePhoto = null,
                    Surname = userDetailsRequest.Surname,
                    UserID = userDetailsRequest.UserID,
                    Username = userDetailsRequest.Username
                };
                await _userRepository.UpdateAsync(request);
                return Ok(request);
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Update Failed");
            }
        }

        //Gets the string value from the hashed password
        private static string GetStringFromHash(byte[] hash)
        {
            try
            {
                StringBuilder result = new StringBuilder();
                for (int i = 0; i < hash.Length; i++)
                {
                    result.Append(hash[i].ToString("X2"));
                }
                return result.ToString();
            }
            catch
            {
                return null;
            }
        }

        //Added Random Values to password to assist hashing.
        private static string ApplySomeSalt(string input)
        {
            try
            {
                return input + "hijsbdlhisbvhisabhbhahvbchlsbv";
            }
            catch
            {
                return null;
            }
        }

        private static string GenerateHash(string Inputstring)
        {
            try
            {
                SHA256 sha256 = SHA256.Create();
                byte[] bytes = Encoding.UTF8.GetBytes(Inputstring);
                byte[] hash = sha256.ComputeHash(bytes);
                return GetStringFromHash(hash);
            }
            catch
            {
                return null;
            }
        }

        // Method to generate a random password of a specified length
        private static string GenerateRandomPassword(int length)
        {
            if (length <= 0)
                throw new ArgumentException("Password length must be greater than 0.");

            Random random = new Random();
            StringBuilder passwordBuilder = new StringBuilder();

            for (int i = 0; i < length; i++)
            {
                int index = random.Next(AllowedChars.Length);
                passwordBuilder.Append(AllowedChars[index]);
            }

            return passwordBuilder.ToString();
        }
    }
}