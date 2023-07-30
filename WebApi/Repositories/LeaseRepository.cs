using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Lease;

namespace WebApi.Repositories
{
    public class LeaseRepository : ILeaseRepository
    {
        private readonly AppDbContext _appDbContext;

        public LeaseRepository(AppDbContext appDbContext)
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

        public async Task<Lease[]> GetAllLeasesAsync()
        {
            IQueryable<Lease> query = _appDbContext.Leases.Include(x => x.Property).Include(x => x.Tenant);
            return await query.ToArrayAsync();
        }


        public async Task AddLease(Lease lease)
        {
            _appDbContext.Add(lease);
            await _appDbContext.SaveChangesAsync();
        }
        }
    }