using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Interfaces;

namespace WebApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _appDbContext;

        public UserRepository(AppDbContext appDbContext)
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

        //Get a user details from database by UserName.
        public User? GetUserByUserName(string userName)
        {
            try
            {
                User user = _appDbContext.User.Where(x => x.Username == userName).FirstOrDefault()!;
                return user;
            }
            catch
            {
                return null;
            }
        }

        public bool CheckUserPassword(string username, string hashedPassword)
        {
            try
            {
                User user = _appDbContext.User.Where(x => x.Password == hashedPassword && x.Username == username).FirstOrDefault()!;
                if (user == null)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch
            {
                return false;
            }
        }

        public bool CheckIfUserNameExsists(string username)
        {
            try
            {
                User user = _appDbContext.User.Where(x => x.Username == username).FirstOrDefault()!;
                if (user != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return true;
            }
        }

        public async Task<User> GetByIdAsync(int id)
        {
            return await _appDbContext.User.FindAsync(id);
        }

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _appDbContext.User.SingleOrDefaultAsync(u => u.Username == username);
        }

        public async Task AddAsync(User user)
        {
            await _appDbContext.User.AddAsync(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task AddUserRoleAsync(UserRole userRole)
        {
            await _appDbContext.UserRole.AddAsync(userRole);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(User user)
        {
            _appDbContext.User.Update(user);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(User user)
        {
            _appDbContext.User.Remove(user);
            await _appDbContext.SaveChangesAsync();
        }
    }
}