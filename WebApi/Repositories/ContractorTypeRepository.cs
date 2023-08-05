using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Admin;
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
            return await _appDbContext.SaveChangesAsync() >0;
        }

        public async Task<ContractorType[]> GetAllContractorTypeAsync()
        {
            IQueryable<ContractorType> query = _appDbContext.ContractorTypes;
            return await query.ToArrayAsync();
        }
        public async Task<ContractorType> GetContractorTypeByID(int ContractorTypeID)
        {
            IQueryable<ContractorType> query = _appDbContext.ContractorTypes.Where(c=>c.ContractorTypeId == ContractorTypeID);
            return await query.FirstAsync();
        }
        public async Task AddContractorType(ContractorType item)
        {
            _appDbContext.ContractorTypes.Add(item);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<ContractorType> EditContractorType(int ContractorTypeID, ContractorTypeViewModel ContractorTypeName) 
        {
            ContractorType x = (ContractorType)await GetContractorTypeByID(ContractorTypeID);
            if (x != null)
            {
                x.ContractorTypeName = ContractorTypeName.ContractorTypeName;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<ContractorType> DeleteContractorTypeAsync(ContractorType item) 
        {
            _appDbContext.ContractorTypes.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


    }
}
