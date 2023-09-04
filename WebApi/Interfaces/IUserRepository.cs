using WebApi.Models.Broker;

namespace WebApi.Models.Interfaces
{
    public interface IUserRepository
    {
        Task<bool> SaveChangesAsync();

        public void Add<T>(T entity) where T : class;

        public Task<User> GetUserByUserName(string userName);

        public Task<bool> CheckUserPassword(string username, string hashedPassword);

        public Task<bool> CheckIfUserNameExsists(string username);

        Task<User> GetUserByIDAsync(int userID);

        Task AddUserRoleAsync(UserRole userRole);

        Task AddAsync(User entity);

        Task UpdateAsync(User entity);

        Task DeleteAsync(User entity);

        Task<User[]> GetAllUsersAsync();

        //void Delete<T>(T entity) where T : class;
    }
}