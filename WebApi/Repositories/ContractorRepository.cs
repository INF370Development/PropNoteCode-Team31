using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class ContractorRepository : IContractorRepository
    {
        private readonly AppDbContext _appDbContext;

        public ContractorRepository(AppDbContext appDbContext)
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

        public async Task<Contractor[]> GetAllContractorsAsync()
        {
            IQueryable<Contractor> query = (IQueryable<Contractor>)_appDbContext.Contractor.Include(t => t.User).Include(t => t.ContractorType);
            return await query.ToArrayAsync();
        }

        public async Task<Contractor> GetContractorByIDAsync(int contractorID)
        {
            IQueryable<Contractor> query = _appDbContext.Contractor.Where(c => c.ContractorID == contractorID).Include(x => x.User);
            return await query.FirstOrDefaultAsync();
        }
        public async Task AddContractor(ContractorTypeViewModel contractor)
        {
            _appDbContext.Add(contractor);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditContractor(int contractorID, Contractor contractor) { }

        public async Task DeleteContractor(Contractor contractor) { }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        public async Task<Contractor> GetByIdAsync(int id)
        {
            return await _appDbContext.Contractor.FindAsync(id);
        }

        public async Task AddAsync(Contractor contractor)
        {
            _appDbContext.Contractor.Add(contractor);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task UpdateAsync(Contractor contractor)
        {
            _appDbContext.Contractor.Update(contractor);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task DeleteAsync(Contractor contractor)
        {
            _appDbContext.Contractor.Remove(contractor);
            await _appDbContext.SaveChangesAsync();
        }
    }
}
