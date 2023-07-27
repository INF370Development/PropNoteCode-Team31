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

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private const string AllowedChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
        private readonly IUserRepository _userRepository;

        //Constructor for the User Controller
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        //Loging Function
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login(LoginDetails userLoginDetails)
        {
            try
            {
                string hashedPassword = GenerateHash(ApplySomeSalt(userLoginDetails.Password!));
                //Search User in database
                var foundUser = _userRepository.GetUserByUserName(userLoginDetails.Username!);
                if (foundUser == null)
                {
                    return StatusCode(StatusCodes.Status404NotFound, "User Not Found");
                }
                else
                {
                    //Check the entered password against the saved password in the database.
                    var passwordCheckResult = _userRepository.CheckUserPassword(foundUser.Username!, hashedPassword);
                    if (passwordCheckResult)
                    {                        //Successful Login
                        return Ok(foundUser);
                    }
                    else
                    {
                        return StatusCode(StatusCodes.Status401Unauthorized, "Incorrect Password");
                    }
                }
            }
            catch
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "System failed to login User.");
            }
        }

        //Create new User
        [HttpPost]
        [Route("CreateNewUser")]
        public async Task<IActionResult> CreateNewUser(RegisterUserModel userDetails)
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
                    // Guid g = Guid.NewGuid();
                    //newUser.SessionID = g.ToString();

                    //Insert UserRole Link

                    // newUser.UserRoleID = 3;

                    //Send email to User
                    var emailHelper = new EmailHelper();
                    emailHelper.SendEmail(newUser.Username, newUser.Email, pass, newUser.Name!);
                    await _userRepository.SaveChangesAsync();
                    return Ok(newUser);
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