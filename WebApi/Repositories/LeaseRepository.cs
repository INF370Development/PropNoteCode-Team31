using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Lease;
using WebApi.Models;
using WebApi.Models.Property;

namespace WebApi.Repositories
{
    public class LeaseRepository : ILeaseRepository
    {
        private readonly AppDbContext _appDbContext;

        public LeaseRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<List<Lease>> GetLeasesByTenantIDAsync(int tenantID)
        {
            // Use Entity Framework or your preferred data access method to query the database
            // and retrieve leases that match the provided tenantID
            var leases = await _appDbContext.Lease
                .Where(lease => lease.TenantID == tenantID)
                .ToListAsync(); // If you're using Entity Framework Core

            // You can customize the query as needed to match your data model

            return leases;
        }
        public void Add<T>(T entity) where T : class
        {
            _appDbContext.Add(entity);
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
        public async Task<List<Lease>> GetLeasesByTenantID(int tenantID)
        {
            return await _appDbContext.Lease
                .Where(lease => lease.TenantID == tenantID)
                .ToListAsync();
        }
        public async Task<Lease[]> GetAllLeasesAsync()
        {
            IQueryable<Lease> query = _appDbContext.Lease;
            return await query.ToArrayAsync();
        }
        public async Task<Property> GetPropertyByLeaseIDAsync(int leaseID)
        {
            // Use Entity Framework or your preferred data access method to query the database
            // and retrieve the property associated with the provided leaseID

            // First, retrieve the lease by ID
            var lease = await _appDbContext.Lease.FirstOrDefaultAsync(l => l.LeaseID == leaseID);

            if (lease != null)
            {
                // If the lease is found, retrieve the associated property
                var property = await _appDbContext.Property.FirstOrDefaultAsync(p => p.PropertyID == lease.PropertyID);
                return property;
            }

            // If the lease is not found, return null or handle the case as needed
            return null;
        }

        public async Task AddLease(Lease lease)
        {
            _appDbContext.Add(lease);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<List<Lease>> GetLeasesByPropertyIDAsync(int propertyID)
        {
            // Assuming you have a DbSet for leases named "Leases" in YourDbContext
            return await _appDbContext.Lease
                .Where(lease => lease.PropertyID == propertyID)
                .ToListAsync();
        }

        public async Task EditLease(int leaseID, Lease lease) { }

        public async Task DeleteLeaseAsync(Lease lease) { }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }
        public async Task<Tenant[]> GetAllTenantsAsync()
        {
            IQueryable<Tenant> query = _appDbContext.Tenant;
            return await query.ToArrayAsync();
        }

        public async Task AddDeposit(Deposit deposit)
        {
            _appDbContext.Add(deposit);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<Lease> GetLeaseByID(int leaseID)
        {
            IQueryable<Lease> query = _appDbContext.Lease.Where(x => x.LeaseID == leaseID);
            return query.FirstOrDefault();
        }
        public async Task<Deposit> GetDepositByID(int depositID)
        {
            IQueryable<Deposit> query = _appDbContext.Deposit.Where(x => x.DepositID == depositID);
            return query.FirstOrDefault();
        }

        public async Task<IEnumerable<Deposit>> GetAllDepositsAsync()
        {
            IQueryable<Deposit> query = _appDbContext.Deposit;
            return await query.ToArrayAsync();
        }

        public async Task<Deposit> GetDepositByIdAsync(int depositId)
        {
            IQueryable<Deposit> query = _appDbContext.Deposit.Where(d => d.DepositID == depositId);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<bool> AddDepositAsync(Deposit deposit)
        {
            _appDbContext.Add(deposit);
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> EditDepositAsync(int depositId, Deposit deposit)
        {
            var existingDeposit = await _appDbContext.Deposit.FirstOrDefaultAsync(d => d.DepositID == depositId);
            if (existingDeposit == null)
            {
                return false;
            }

            // Update the existing deposit properties
            existingDeposit.LeaseID = deposit.LeaseID;
            existingDeposit.Amount = deposit.Amount;

            _appDbContext.Entry(existingDeposit).State = EntityState.Modified;
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteDepositAsync(int depositId)
        {
            var existingDeposit = await _appDbContext.Deposit.FirstOrDefaultAsync(d => d.DepositID == depositId);
            if (existingDeposit == null)
            {
                return false;
            }

            _appDbContext.Deposit.Remove(existingDeposit);
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<Deposit[]> GetAllDepositsByLeaseAsync(int leaseId)
        {
            IQueryable<Deposit> query = _appDbContext.Deposit.Where(d => d.LeaseID == leaseId);
            return await query.ToArrayAsync();
        }

    }
}