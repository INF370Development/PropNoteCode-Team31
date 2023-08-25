using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IContractorRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task<Contractor[]> GetAllContractorsAsync();

        Task<Contractor> GetContractorByIDAsync(int contractorID);


        Task EditContractor(int contractorID, Contractor contractor);

        Task DeleteContractor(Contractor contractor);

        Task<Contractor> GetByIdAsync(int id);
        Task AddAsync(Contractor contractor);
        Task UpdateAsync(Contractor contractor);
        Task DeleteAsync(Contractor contractor);

        void Delete<T>(T entity) where T : class;
    }
}
