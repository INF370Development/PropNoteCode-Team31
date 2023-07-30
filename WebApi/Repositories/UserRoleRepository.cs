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
        public Role? GetRoleByDescription(string userName)
        {
            try
            {
                Role role = _appDbContext.Role.Where(x => x.Username == userName).FirstOrDefault()!;
                return user;
            }
            catch
            {
                return null;
            }
        }
    }
}