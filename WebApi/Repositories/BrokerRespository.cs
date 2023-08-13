using Microsoft.EntityFrameworkCore;
using WebApi.Models.Broker;
using WebApi.Models.Interfaces;

namespace WebApi.Repositories
{
    public class BrokerRespository : IBrokerRepository
    {
        private readonly AppDbContext _appDbContext;

        public BrokerRespository(AppDbContext appDbContext)
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
        public async Task<Broker[]> GetAllBrokersAsync()
        {
            IQueryable<Broker> query = _appDbContext.Broker;
            return await query.ToArrayAsync();
        }

        public async Task AddBroker(Broker broker)
        {
            _appDbContext.Add(broker);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditBroker(int brokerID, Broker broker) { }

        public async Task DeleteBrokerAsync(Broker broker) { }

        public void Delete<T>(T entity) where T :class
        {
            _appDbContext.Remove(entity);
        }
        public async Task<Broker> GetBrokerByID(int brokerID)
        {
            IQueryable<Broker> query = _appDbContext.Broker.Where(x => x.BrokerID == brokerID);
            return await query.FirstOrDefaultAsync();
        }
    }
}
