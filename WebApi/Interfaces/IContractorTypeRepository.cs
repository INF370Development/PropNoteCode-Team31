using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Interfaces
{
    public interface IContractorTypeRepository
    {

        Task<bool> SaveChangesAsync();
        Task<ContractorType[]> GetAllContractorTypesAsync();
        Task AddContractorType(ContractorType contractorType);
        Task EditContractorType(int dataTypeID, ContractorType contractorType);
        Task DeleteContractorType(ContractorType contractorType);
        Task<ContractorType> GetContractorTypeByIDAsync(int contractorTypeID);
    }
}