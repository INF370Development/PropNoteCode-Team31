using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class TenantRepository : ITenantRepository
    {
        private readonly AppDbContext _appDbContext;

        public TenantRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }



        public async Task<Tenant[]> GetAllTenantsAsync()
        {
            IQueryable<Tenant> query = _appDbContext.Tenant;

            return await query.ToArrayAsync();
        }
    }
}
