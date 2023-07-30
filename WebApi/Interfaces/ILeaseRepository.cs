using WebApi.Models.Lease;

namespace WebApi.Interfaces
{
    public interface ILeaseRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task<Lease[]> GetAllLeasesAsync();
        Task AddLease(Lease lease);
    }
}
