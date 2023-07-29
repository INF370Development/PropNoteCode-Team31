using Microsoft.EntityFrameworkCore;
using WebApi.Models.Admin;

namespace WebApi.Interfaces
{
    public interface IContractorTypeRepository
    {

        Task<bool> SaveChangesAsync();
        Task AddContractorType(ContractorType item);
        Task<ContractorType[]> GetAllContractorTypeAsync();
        Task<ContractorType> GetContractorTypeByID(int SnagListItemID);
        Task<ContractorType> EditContractorType(int ContractorTypeID, string ContractorTypeName);
        Task<ContractorType> DeleteContractorTypeAsync(ContractorType item);

    }
}
