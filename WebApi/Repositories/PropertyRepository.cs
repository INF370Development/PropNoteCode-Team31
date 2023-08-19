using Microsoft.EntityFrameworkCore;
using WebApi.Interfaces;
using WebApi.Models.Property;

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

        public async Task<Property> GetPropertyByIDAsync(int propertyID)
        {
            IQueryable<Property> query = _appDbContext.Property.Where(c => c.PropertyID == propertyID).Include(x => x.Broker);
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

        public async Task<List<Inspection>> GetAllInspectionsForPropertyAsync(int propertyID)
        {
            return await _appDbContext.Inspection
                .Where(inspection => inspection.PropertyID == propertyID)
                .ToListAsync();
        }
       
        public async Task AddInspection(Inspection inspection)
        {
            _appDbContext.Add(inspection);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<Inspection> GetInspectionByIDAsync(int inspectionID)
        {
            return await _appDbContext.Inspection.FindAsync(inspectionID);
        }

        public void DeleteInspection(Inspection inspection)
        {
            _appDbContext.Inspection.Remove(inspection);
        }

        public async Task<List<Recovery>> GetAllRecoveriesForPropertyAsync(int propertyID)
        {
            return await _appDbContext.Recovery
                .Where(inspection => inspection.PropertyID == propertyID)
                .ToListAsync();
        }

        public async Task AddRecovery(Recovery recovery)
        {
            _appDbContext.Add(recovery);
            await _appDbContext.SaveChangesAsync();
        }

        public async Task<Recovery> GetRecoveryByIDAsync(int recoveryID)
        {
            return await _appDbContext.Recovery.FindAsync(recoveryID);
        }

        public void DeleteRecovery(Recovery recovery)
        {
            _appDbContext.Recovery.Remove(recovery);
        }

    }
}
