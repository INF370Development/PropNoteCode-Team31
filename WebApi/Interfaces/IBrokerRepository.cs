using Microsoft.EntityFrameworkCore;
using WebApi.Models.Admin;

namespace WebApi.Interfaces
{
    public interface IBrokerRepository
    {

        Task<bool> SaveChangesAsync();
        Task<Broker> AddBroker(Broker broker);
        Task<Broker[]> GetAllBrokersAsync();
        Task<Broker> EditBroker(int brokerId, Broker broker);
        Task<Broker> DeleteBrokerAsync( Broker broker);
        Task<Broker> GetBrokerByID(int brokerID);
    }
}
