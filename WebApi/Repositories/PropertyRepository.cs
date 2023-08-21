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
            IQueryable<Property> query = (IQueryable<Property>)_appDbContext.Property.Include(x => x.Broker).Include(x => x.Inspections).Include(x => x.Recoveries);
            return await query.ToArrayAsync();
        }

        public async Task<Property> GetPropertyByIDAsync(int propertyID)
        {
            IQueryable<Property> query = _appDbContext.Property.Where(c => c.PropertyID == propertyID).Include(x => x.Broker).Include(x => x.Inspections).Include(x => x.Recoveries);
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
                .Where(inspection => inspection.PropertyID == propertyID).Include(x => x.InspectionType).Include(x => x.InspectionStatus)
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
                .Where(inspection => inspection.PropertyID == propertyID).Include(x => x.RecoveryType.RecoveryTypeDescription)
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
        public async Task<InspectionType[]> GetAllInspectionTypesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<InspectionType> query = (IQueryable<InspectionType>)_appDbContext.InspectionType;
            return await query.ToArrayAsync();
        }


        public async Task AddInspectionType(InspectionType inspectionType)
        {
            _appDbContext.Add(inspectionType);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<InspectionType> GetInspectionTypeByIDAsync(int inspectionTypeID)
        {
            IQueryable<InspectionType> query = _appDbContext.InspectionType.Where(c => c.InspectionTypeID == inspectionTypeID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<InspectionStatus[]> GetAllInspectionStatusesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<InspectionStatus> query = (IQueryable<InspectionStatus>)_appDbContext.InspectionStatus;
            return await query.ToArrayAsync();
        }


        public async Task AddInspectionStatus(InspectionStatus inspectionStatus)
        {
            _appDbContext.Add(inspectionStatus);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<InspectionStatus> GetInspectionStatusByIDAsync(int inspectionStatusID)
        {
            IQueryable<InspectionStatus> query = _appDbContext.InspectionStatus.Where(c => c.InspectionStatusID == inspectionStatusID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<RecoveryType[]> GetAllRecoveryTypesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<RecoveryType> query = (IQueryable<RecoveryType>)_appDbContext.RecoveryType;
            return await query.ToArrayAsync();
        }


        public async Task AddRecoveryType(RecoveryType recoveryType)
        {
            _appDbContext.Add(recoveryType);
            await _appDbContext.SaveChangesAsync();
        }
        public async Task<RecoveryType> GetRecoveryTypeByIDAsync(int recoveryTypeID)
        {
            IQueryable<RecoveryType> query = _appDbContext.RecoveryType.Where(c => c.RecoveryTypeID == recoveryTypeID);
            return await query.FirstOrDefaultAsync();
        }

        public async Task<Recovery[]> GetAllRecoveriesAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<Recovery> query = (IQueryable<Recovery>)_appDbContext.Recovery.Include(x=> x.RecoveryType);
            return await query.ToArrayAsync();
        }

        public async Task<Inspection[]> GetAllInspectionsAsync()
        {
            // IQueryable<Property> query = _appDbContext.Properties.Include(x => x.Broker);
            IQueryable<Inspection> query = (IQueryable<Inspection>)_appDbContext.Inspection.Include(x => x.InspectionType).Include(x => x.InspectionStatus);
            return await query.ToArrayAsync();
        }

    }
}
