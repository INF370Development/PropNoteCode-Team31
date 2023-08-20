using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ITenantRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task<Tenant[]> GetAllTenantsAsync();

        Task<Tenant> GetTenantByIDAsync(int tenantID);

        Task AddTenant(Tenant tenant);

        Task EditTenant(int tenantID, Tenant tenant);

        Task DeleteTenant(Tenant tenant);

        Task<Tenant> GetByIdAsync(int id);
        Task AddAsync(Tenant tenant);
        Task UpdateAsync(Tenant tenant);
        Task DeleteAsync(Tenant tenant);
    }
}
