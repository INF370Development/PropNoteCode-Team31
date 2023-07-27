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
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}