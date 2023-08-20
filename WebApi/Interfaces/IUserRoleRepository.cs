using WebApi.Models;
using WebApi.Models.Users;

namespace WebApi.Interfaces
{
    public interface IUserRoleRepository
    {
        Task<bool> SaveChangesAsync();

        public void Add<T>(T entity) where T : class;

        public int GetRoleIdByDescription(string roleName);

        Task<Role> GetByIdAsync(int id);
        Task<Role> GetRoleByNameAsync(string roleName);
        Task AddAsync(Role role);
        Task UpdateAsync(Role role);
        Task DeleteAsync(Role role);
        Task AddUserRoleAsync(UserRole userRole);
    }
}