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

        public async Task<Payment> AddPayment(Payment item)
        {
            _appDbContext.Payment.Add(item);
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
            IQueryable<Payment> query = _appDbContext.Payment.Where(x => x.MaintenaceID == PaymentID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Payment> EditPayment(int PaymentId,int MaintenanceId, double amount)
        {
            Payment x = (Payment)await GetPaymentByID(PaymentId);
            if (x != null)
            {
                x.MaintenaceID = MaintenanceId;
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

        public async Task<MaintenanceType> AddMaintenanceType(MaintenanceType item)
        {
            _appDbContext.MaintenanceType.Add(item);
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
            IQueryable<MaintenanceType> query = _appDbContext.MaintenanceType.Where(x => x.MaintenaceTypeID == MaintenanceTypeID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceType> EditMaintenanceType(int MaintenanceTypeId, string MaintenanceTypeName)
        {
            MaintenanceType x = await GetMaintenanceTypeByID(MaintenanceTypeId);
            if (x != null)
            {
                x.MaintenaceTypeName = MaintenanceTypeName;
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
            _appDbContext.MaintenanceStatus.Add(item);
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
            IQueryable<MaintenanceStatus> query = _appDbContext.MaintenanceStatus.Where(x => x.MaintenaceStatusID == MaintenanceStatusID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceStatus> EditMaintenanceStatus(int MaintenanceStatusId, string MaintenanceStatusName)
        {
            MaintenanceStatus x = await GetMaintenanceStatusByID(MaintenanceStatusId);
            if (x != null)
            {
                x.MaintenaceStatusName = MaintenanceStatusName;
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
            _appDbContext.MaintenanceNote.Add(item);
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
                .Where(x => x.MaintenaceID == MaintenanceNoteID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceNote> EditMaintenanceNote(int MaintenanceNoteId,int maintenance, string MaintenanceNoteDescription)
        {
            MaintenanceNote x = await GetMaintenanceNoteByID(MaintenanceNoteId);
            if (x != null)
            {
                x.MaintenaceID = maintenance;
                x.MaintenaceNoteDescription = MaintenanceNoteDescription;
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
            _appDbContext.Maintenance.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Maintenance[]> GetAllMaintenanceAsync()
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenance;
            return await query.ToArrayAsync();
        }
        public async Task<Maintenance> GetMaintenanceByID(int MaintenanceID)
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenance
                .Where(x => x.MaintenaceID == MaintenanceID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Maintenance> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, DateTime Time)
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
