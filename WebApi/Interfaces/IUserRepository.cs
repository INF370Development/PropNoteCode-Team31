using WebApi.Models.Broker;

namespace WebApi.Models.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> SaveChangesAsync();

        User? GetUserByUserName(string userName);

        /// <summary>
        /// Returns the a boolean if the users password is correct or not.
        /// </summary>
        /// <param name="username"></param>
        /// <param name="hashedPassword"></param>
        /// <returns>true or False</returns>
        public bool CheckUserPassword(string username, string hashedPassword);
    }
}