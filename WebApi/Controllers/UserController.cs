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

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private const string AllowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
        private readonly IUserRepository _userRepository;
        private readonly IUserRoleRepository _userRoleRepository;

        //Constructor for the User Controller
        public UserController(IUserRepository userRepository,IUserRoleRepository userRoleRepository)
        {
            _userRepository = userRepository;
            _userRoleRepository = userRoleRepository;
        }

        //Loging Function
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDetailsRequest userLoginDetails)
        {
            try
            {
                string hashedPassword = GenerateHash(ApplySomeSalt(userLoginDetails.Password!));
                //Search User in database
                var foundUser = _userRepository.GetUserByUserName(userLoginDetails.Username!);
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
                    var passwordCheckResult = _userRepository.CheckUserPassword(foundUser.Username!, hashedPassword);
                    if (passwordCheckResult)
                    {                        //Successful Login
                       //var userRole = _userRoleRepository.GetUserRoleNameByUserId(foundUser.UserID);
                                             //Return Result
                        var result = new RegisterUserResponse()
                        {
                            Username = foundUser.Username,
                            UserID = foundUser.UserID,
                            Email = foundUser.Email,
                            Name = foundUser.Name,
                            UserRoleName = "Admin",
                            IsSuccess = true,
                        };
                        return StatusCode(StatusCodes.Status200OK, result);
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

        //Create new User
        [HttpPost]
        [Route("CreateNewUser")]
        public async Task<IActionResult> CreateNewUser(RegisterUserRequest userDetails)
        {
            try
            {
                bool Userexsists = _userRepository.CheckIfUserNameExsists(userDetails.Username!);
                //Checking for Users with name user name
                if (Userexsists == true)
                {
                    return StatusCode(StatusCodes.Status451UnavailableForLegalReasons, "Username Already Exsists.");
                }
                else
                {
                    User newUser = new User();
                    string pass = GenerateRandomPassword(8);
                    var hashedPassword = GenerateHash(ApplySomeSalt(pass));
                    newUser.Password = hashedPassword;
                    newUser.Username = userDetails.Username;
                    newUser.Email = userDetails.Email;
                    newUser.Name = userDetails.Name;
                    _userRepository.Add(newUser);
                    await _userRepository.SaveChangesAsync();
                    // Guid g = Guid.NewGuid();
                    //newUser.SessionID = g.ToString();
                    var foundUser = _userRepository.GetUserByUserName(newUser.Username);
                    // newUser.UserRoleID = 3;
                    //var userRoleId = _userRoleRepository.GetRoleIdByDescription(userDetails.userRole);

                    //Insert UserRole Link
                    /*var userRole = new UserRole()
                    {
                        UserID = foundUser.UserID,
                        UserRoleID = userRoleId
                    };*/
                    //_userRoleRepository.Add(userRole);

                    //Return Result
                    var result = new RegisterUserResponse()
                    {
                        Username = newUser.Username,
                        UserID = foundUser.UserID,
                        Email = newUser.Email,
                        Name = newUser.Name,
                        UserRoleName = userDetails.userRole,
                        IsSuccess = true,                       
                    };


                    //Send email to User
                   /* var emailHelper = new EmailHelper();
                    emailHelper.SendEmail(newUser.Username, newUser.Email, pass, newUser.Name!);*/
                    
                    return Ok(result);
                }
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "User Creation Failed.");
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