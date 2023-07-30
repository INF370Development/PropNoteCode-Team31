using Microsoft.EntityFrameworkCore;
using WebApi.Models.Admin;
using WebApi.Interfaces;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class BrokerRepository : IBrokerRepository
    {
            private readonly AppDbContext _appDbContext;

            public BrokerRepository(AppDbContext appDbContext)
            {
                _appDbContext = appDbContext;
            }

            public async Task<bool> SaveChangesAsync()
            {
                return await _appDbContext.SaveChangesAsync() > 0;
            }
            public async Task<Broker[]> GetAllBrokersAsync()
            {
                IQueryable<Broker> query = _appDbContext.Broker;
                return await query.ToArrayAsync();
            }

            public async Task<Broker> AddBroker(Broker broker)
            {
                _appDbContext.Broker.Add(broker);
                await _appDbContext.SaveChangesAsync();
                return broker;
            }

            public async Task<Broker> EditBroker(int brokerID, Broker broker)
            {
                Broker x = (Broker)await GetBrokerByID(brokerID);
                if (x != null)
                {
                    x.Name = broker.Name;
                    x.Surname = broker.Surname;
                    x.PhoneNumber = broker.PhoneNumber;
                    x.OfficeAddress = broker.OfficeAddress;
                    x.LicenseNumber = broker.LicenseNumber;
                    x.CommissionRate = broker.CommissionRate;
                    await _appDbContext.SaveChangesAsync();
                }
                return x;
            }

            public async Task<Broker> DeleteBrokerAsync(Broker broker)
            {
                _appDbContext.Broker.Remove(broker);
                await _appDbContext.SaveChangesAsync();
                return broker;
            }

            public async Task<Broker> GetBrokerByID(int brokerID)
            {
                IQueryable<Broker> query = _appDbContext.Broker.Where(x => x.BrokerID == brokerID);
                return await query.FirstOrDefaultAsync();
            }
    }
}
