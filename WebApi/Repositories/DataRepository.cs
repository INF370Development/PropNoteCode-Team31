using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Data;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class DataRepository : IDataRepository
    {
        private readonly AppDbContext _appDbContext;

        public DataRepository(AppDbContext appDbContext)
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


        public async Task<Data[]> GetAllDataAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<Data> query = (IQueryable<Data>)_appDbContext.Data.Include(x => x.DataType);
            return await query.ToArrayAsync();
        }


        public async Task AddData(Data data)
        {
            _appDbContext.Add(data);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditData(int dataID, Data data) { }

        public async Task DeleteData(Data data) { }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }

        public async Task<DataType[]> GetAllDataTypesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<DataType> query = (IQueryable<DataType>)_appDbContext.DataType;
            return await query.ToArrayAsync();
        }


        public async Task AddDataType(DataType dataType)
        {
            _appDbContext.Add(dataType);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditDataType(int dataTypeID, DataType dataType) { }

        public async Task DeleteDataType(DataType dataType) { }

    }
}
