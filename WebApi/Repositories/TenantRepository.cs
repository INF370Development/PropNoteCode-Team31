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
            IQueryable<Tenant> query = (IQueryable<Tenant>)_appDbContext.Tenant.Include(x => x.Leases);
            return await query.ToArrayAsync();
        }

        public async Task<Tenant> GetTenantByIDAsync(int tenantID)
        {
            IQueryable<Tenant> query = _appDbContext.Tenant.Where(c => c.TenantID == tenantID).Include(x => x.Leases);
            return await query.FirstOrDefaultAsync();
        }
        public async Task AddTenant(Tenant tenant)
        {
            _appDbContext.Add(tenant);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditTenant(int tenantID, Tenant tenant) { }

        public async Task DeleteTenant(Tenant tenant) { }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        public async Task<Tenant> GetByIdAsync(int id)
        {
            return await _appDbContext.Tenant.FindAsync(id);
        }

        public async Task AddAsync(Tenant tenant)
        {
            _appDbContext.Tenant.Add(tenant);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Tenant tenant)
        {
            _appDbContext.Tenant.Update(tenant);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Tenant tenant)
        {
            _appDbContext.Tenant.Remove(tenant);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
