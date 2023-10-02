using Microsoft.EntityFrameworkCore;
using System.Xml.Linq;
using WebApi.Interfaces;
using WebApi.Models;
using WebApi.Models.Admin;
using WebApi.Models.Maintenance;

namespace WebApi.Repositories
{
    public class MaintenanceRepository : IMaintenanceRepository
    {
        private readonly AppDbContext _appDbContext; 

        public MaintenanceRepository(AppDbContext appDbContext)
        {
            _appDbContext = appDbContext;
        }
        public async Task<bool> SaveChangesAsync()
        {
            return await _appDbContext.SaveChangesAsync() > 0;
        }
        public async Task<IEnumerable<Maintenance>> GetMaintenanceByPropertyID(int propertyId)
        {
            // Query the database to get maintenance records for the specified PropertyId
            var maintenanceRecords = await _appDbContext.Maintenance
                .Where(m => m.PropertyID == propertyId)
                .ToListAsync();

            return maintenanceRecords;
        }
        public async Task<Payment> AddPayment(Payment item)
        {
            _appDbContext.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Payment[]> GetAllPaymentAsync()
        {
            IQueryable<Payment> query = _appDbContext.Payment;
            return await query.ToArrayAsync();
        }
        public async Task<Payment> GetPaymentByID(int PaymentID)
        {
            IQueryable<Payment> query = _appDbContext.Payment.Where(x => x.MaintenanceID == PaymentID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Payment> EditPayment(int PaymentId,int MaintenanceId, decimal amount)
        {
            Payment x = (Payment)await GetPaymentByID(PaymentId);
            if (x != null)
            {
                x.MaintenanceID = MaintenanceId;
                x.Amount = amount;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<Payment> DeletePaymentAsync(Payment item)
        {
            _appDbContext.Payment.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }

        public async Task<List<MaintenanceNote>> GetMaintenanceNotesByMaintenanceIDAsync(int maintenanceID)
        {
            // Use the appropriate DbSet and navigation property based on your data model
            return await _appDbContext.MaintenanceNote
                .Where(note => note.MaintenanceID == maintenanceID)
                .ToListAsync();
        }
        public async Task<MaintenanceType> AddMaintenanceType(MaintenanceType item)
        {
            _appDbContext.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceType[]> GetAllMaintenanceTypeAsync()
        {
            IQueryable<MaintenanceType> query = _appDbContext.MaintenanceType;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceType> GetMaintenanceTypeByID(int MaintenanceTypeID)
        {
            IQueryable<MaintenanceType> query = _appDbContext.MaintenanceType.Where(x => x.MaintenanceTypeID == MaintenanceTypeID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceType> EditMaintenanceType(int MaintenanceTypeId, string MaintenanceTypeName)
        {
            MaintenanceType x = await GetMaintenanceTypeByID(MaintenanceTypeId);
            if (x != null)
            {
                x.MaintenanceTypeName = MaintenanceTypeName;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<MaintenanceType> DeleteMaintenanceTypeAsync(MaintenanceType item)
        {
            _appDbContext.MaintenanceType.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<MaintenanceStatus> AddMaintenanceStatus(MaintenanceStatus item)
        {
            _appDbContext.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceStatus[]> GetAllMaintenanceStatusAsync()
        {
            IQueryable<MaintenanceStatus> query = _appDbContext.MaintenanceStatus;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceStatus> GetMaintenanceStatusByID(int MaintenanceStatusID)
        {
            IQueryable<MaintenanceStatus> query = _appDbContext.MaintenanceStatus.Where(x => x.MaintenanceStatusID == MaintenanceStatusID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceStatus> EditMaintenanceStatus(int MaintenanceStatusId, string MaintenanceStatusName)
        {
            MaintenanceStatus x = await GetMaintenanceStatusByID(MaintenanceStatusId);
            if (x != null)
            {
                x.MaintenanceStatusName = MaintenanceStatusName;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<MaintenanceStatus> DeleteMaintenanceStatusAsync(MaintenanceStatus item)
        {
            _appDbContext.MaintenanceStatus.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }



        public async Task<MaintenanceNote> AddMaintenanceNote(MaintenanceNote item)
        {
            _appDbContext.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceNote[]> GetAllMaintenanceNoteAsync()
        {
            IQueryable<MaintenanceNote> query = _appDbContext.MaintenanceNote;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceNote> GetMaintenanceNoteByID(int MaintenanceNoteID)
        {
            IQueryable<MaintenanceNote> query = _appDbContext.MaintenanceNote
                .Where(x => x.MaintenanceID == MaintenanceNoteID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceNote> EditMaintenanceNote(int MaintenanceNoteId,int maintenance, string MaintenanceNoteDescription)
        {
            MaintenanceNote x = await GetMaintenanceNoteByID(MaintenanceNoteId);
            if (x != null)
            {
                x.MaintenanceID = maintenance;
                x.MaintenanceNoteDescription = MaintenanceNoteDescription;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<MaintenanceNote> DeleteMaintenanceNoteAsync(MaintenanceNote item)
        {
            _appDbContext.MaintenanceNote.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<Maintenance> AddMaintenance(Maintenance item)
        {
            _appDbContext.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Maintenance[]> GetAllMaintenanceAsync()
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenance.
                Include(t => t.Property).Include(t => t.Contractor).Include(t => t.MaintenanceStatus).
                Include(t => t.MaintenanceType); 
            return await query.ToArrayAsync();
        }
        public async Task<Maintenance> UpdateMaintenanceAsync(Maintenance maintenance)
        {
            var existingMaintenance = await _appDbContext.Maintenance.FindAsync(maintenance.MaintenanceID);

            if (existingMaintenance != null)
            {
                // Update the existing maintenance record with the new values
                _appDbContext.Entry(existingMaintenance).CurrentValues.SetValues(maintenance);
                await _appDbContext.SaveChangesAsync();
                return existingMaintenance;
            }
            else
            {
                // Maintenance record not found
                return null;
            }
        }
        public async Task<Maintenance> GetMaintenanceAsync(int maintenanceID)
        {
            // Include related entities if needed
            return await _appDbContext.Maintenance
                .AsNoTracking() // Use AsNoTracking to improve performance for read-only operations
                .FirstOrDefaultAsync(m => m.MaintenanceID == maintenanceID);
        }

        public async Task<Maintenance> GetMaintenanceByID(int MaintenanceID)
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenance
                .Where(x => x.MaintenanceID == MaintenanceID).Include(t => t.Property).Include(t => t.Contractor).Include(t => t.MaintenanceStatus).
                Include(t => t.MaintenanceType);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Maintenance> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, string Time)
        {
            Maintenance x = await GetMaintenanceByID(MaintenanceId);
            if (x != null)
            {
                x.PropertyID = PropertyId;
                x.ContractorID = ContractorId;
                x.MaintenanceStatusID = MaintenanceStatusId;
                x.MaintenanceTypeID = MaintenanceTypeId;
                x.MaintenanceDate = Date;
                x.MaintenanceTime = Time;
                await _appDbContext.SaveChangesAsync();
            }
            return x;
        }
        public async Task<Maintenance> DeleteMaintenanceAsync(Maintenance item)
        {
            _appDbContext.Maintenance.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


    }
}
