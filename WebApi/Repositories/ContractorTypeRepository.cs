using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class ContractorTypeRepository : IContractorTypeRepository
    {
        private readonly AppDbContext _appDbContext;

        public ContractorTypeRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }

        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }

        public async Task<ContractorType[]> GetAllContractorTypesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<ContractorType> query = (IQueryable<ContractorType>)_appDbContext.ContractorType;
            return await query.ToArrayAsync();
        }


        public async Task AddContractorType(ContractorType contractorType)
        {
            _appDbContext.Add(contractorType);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditContractorType(int dataTypeID, ContractorType contractorType) { }

        public async Task DeleteContractorType(ContractorType contractorType) { }

        public async Task<ContractorType> GetContractorTypeByIDAsync(int contractorTypeID)
        {
            IQueryable<ContractorType> query = _appDbContext.ContractorType.Where(c => c.ContractorTypeId == contractorTypeID);
            return await query.FirstOrDefaultAsync();
        }

    }
}