using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Interfaces;
using WebApi.Models.Users;

namespace WebApi.Repositories
{
    public class UserRoleRepository : IUserRoleRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRoleRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }

        //Save any database changes on inserts,deletes and Edits
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        //Gets all userRoles.
        public int GetRoleIdByDescription(string roleName)
        {
            try
            {
                Role role = _appDbContext.Role.Where(x => x.Name == roleName).FirstOrDefault()!;
                return role.RoleID;
            }
            catch
            {
                return 0;
            }
        }
        public async Task<Role> GetByIdAsync(int id)
        {
            return await _appDbContext.Role.FindAsync(id);
        }

        public async Task<Role> GetRoleByNameAsync(string roleName)
        {
            return await _appDbContext.Role.SingleOrDefaultAsync(r => r.Name == roleName);
        }

        public async Task AddAsync(Role role)
        {
            _appDbContext.Role.Add(role);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task AddUserRoleAsync(UserRole userRole)
        {
            _appDbContext.UserRole.Add(userRole);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Role role)
        {
            _appDbContext.Role.Update(role);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Role role)
        {
            _appDbContext.Role.Remove(role);
            await _appDbContext.SaveChangesAsync();
        }
    }
}