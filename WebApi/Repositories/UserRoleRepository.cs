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
        public string GetUserRoleNameByUserId(int UserId)
        {
            try
            {
                UserRole userRole = _appDbContext.UserRole.Where(x => x.UserID == UserId).FirstOrDefault()!;
                if (userRole != null)
                {
                    var UserRoleName = _appDbContext.Role.Where(x => x.RoleID == userRole.UserRoleID).FirstOrDefault();
                    if (UserRoleName != null)
                    {
                        return UserRoleName.Name;
                    }
                    else
                    {
                        return null;
                    }
                }
                return null;
            }
            catch
            {
                return null;
            }
        }
    }
}