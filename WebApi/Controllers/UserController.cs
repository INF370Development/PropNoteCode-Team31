using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using WebApi.Models;
using WebApi.Models.Interfaces;

namespace WebApi.Controllers
{
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;

        //Constructor for the User Controller
        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        //Loging Function
        [Route("api/User/Login")]
        [HttpPost]
        private User? Login(User userDetails)
        {
            try
            {
                string hashedPassword = GenerateHash(ApplySomeSalt(userDetails.Password!));
                //Search User in database
                var foundUser = _userRepository.GetUserByUserName(userDetails.Username!);
                if (foundUser == null)
                {
                    throw new Exception("User Not Found");
                }
                else
                {
                    //Check the entered password against the saved password in the database.
                    var passwordCheckResult = _userRepository.CheckUserPassword(foundUser.Username!, hashedPassword);
                    if (passwordCheckResult)
                    {
                        //Successful Login
                        return foundUser;
                    }
                    throw new Exception("Password is Incorrect.");
                }
            }
            catch
            {
                return null;
            }
        }

        public static string GenerateHash(string Inputstring)
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
        public static string ApplySomeSalt(string input)
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
    }
}