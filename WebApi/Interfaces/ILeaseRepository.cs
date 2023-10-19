using WebApi.Models.Lease;
using WebApi.Models;
using WebApi.Models.Property;

namespace WebApi.Interfaces
{
    public interface ILeaseRepository
    {
        Task<bool> SaveChangesAsync();
        void Add<T>(T entity) where T : class;
        Task<Lease[]> GetAllLeasesAsync();
        Task AddLease(Lease lease);
        Task<Tenant[]> GetAllTenantsAsync();
        Task AddDeposit(Deposit deposit);
        Task<List<Lease>> GetLeasesByPropertyIDAsync(int propertyID);
        Task<Deposit> GetDepositByID(int depositID);
        Task EditLease(int leaseID, Lease lease);
        Task<Lease> GetLeaseByID(int leaseID);
        Task DeleteLeaseAsync(Lease lease);
        void Delete<T>(T entity) where T : class;
        Task<List<Lease>> GetLeasesByTenantID(int tenantID);
        Task<IEnumerable<Deposit>> GetAllDepositsAsync();
        Task<Deposit> GetDepositByIdAsync(int depositId);
        Task<bool> AddDepositAsync(Deposit deposit);
        Task<bool> EditDepositAsync(int depositId, Deposit deposit);
        Task<bool> DeleteDepositAsync(int depositId);
        Task<Deposit[]> GetAllDepositsByLeaseAsync(int leaseId);
        Task<List<Lease>> GetLeasesByTenantIDAsync(int tenantID);
        Task<Property> GetPropertyByLeaseIDAsync(int leaseID);
    }
}
