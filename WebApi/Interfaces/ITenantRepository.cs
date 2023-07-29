using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface ITenantRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task<Tenant[]> GetAllTenantsAsync();



    }
}
