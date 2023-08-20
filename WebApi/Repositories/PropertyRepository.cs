using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Property;
using WebApi.Models;

namespace WebApi.Repositories
{
    public class PropertyRepository : IPropertyRepository
    {
        private readonly AppDbContext _appDbContext;

        public PropertyRepository(AppDbContext appDbContext)
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


        public async Task<Property[]> GetAllPropertiesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<Property> query = (IQueryable<Property>)_appDbContext.Property.Include(x => x.Broker);
            return await query.ToArrayAsync();
        }

        public async Task<Property> GetPropertyAsync(int id)
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<Property> query = (IQueryable<Property>)_appDbContext.Property.Where(x => x.PropertyID==id);
            return await query.FirstOrDefaultAsync();
        }
        public async Task AddProperty(Property property)
        {
            _appDbContext.Add(property);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task EditProperty(int propertyID, Property property) { }

        public async Task DeleteProperty(Property property) { }

        public void Delete<T>(T entity) where T : class
        {
            _appDbContext.Remove(entity);
        }
    }
}
