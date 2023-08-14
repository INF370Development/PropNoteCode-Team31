using Microsoft.EntityFrameworkCore;
using WebApi.Models.Admin;

namespace WebApi.Interfaces
{
    public interface IBrokerRepository
    {

        Task<bool> SaveChangesAsync();
        Task AddBroker(Broker broker);
        Task<Broker[]> GetAllBrokersAsync();
        Task EditBroker(int brokerId, Broker broker);
        Task DeleteBrokerAsync(Broker broker);
        void Delete<T>(T entity) where T : class;
        Task<Broker> GetBrokerByID(int brokerID);
    }
}
