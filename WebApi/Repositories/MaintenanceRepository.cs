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
            _appDbContext.Payments.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Payment[]> GetAllPaymentAsync()
        {
            IQueryable<Payment> query = _appDbContext.Payments;
            return await query.ToArrayAsync();
        }
        public async Task<Payment> GetPaymentByID(int PaymentID)
        {
            IQueryable<Payment> query = _appDbContext.Payments.Where(x => x.PaymentID == PaymentID);
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
            _appDbContext.Payments.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }

        public async Task<MaintenanceType> AddMaintenanceType(MaintenanceType item)
        {
            _appDbContext.MaintenanceTypes.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceType[]> GetAllMaintenanceTypeAsync()
        {
            IQueryable<MaintenanceType> query = _appDbContext.MaintenanceTypes;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceType> GetMaintenanceTypeByID(int MaintenanceTypeID)
        {
            IQueryable<MaintenanceType> query = _appDbContext.MaintenanceTypes.Where(x => x.MaintenaceTypeID == MaintenanceTypeID);
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
            _appDbContext.MaintenanceTypes.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<MaintenanceStatus> AddMaintenanceStatus(MaintenanceStatus item)
        {
            _appDbContext.MaintenanceStatuses.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceStatus[]> GetAllMaintenanceStatusAsync()
        {
            IQueryable<MaintenanceStatus> query = _appDbContext.MaintenanceStatuses;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceStatus> GetMaintenanceStatusByID(int MaintenanceStatusID)
        {
            IQueryable<MaintenanceStatus> query = _appDbContext.MaintenanceStatuses.Where(x => x.MaintenaceStatusID == MaintenanceStatusID);
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
            _appDbContext.MaintenanceStatuses.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<MaintenancePropertyLine> AddMaintenancePropertyLine(MaintenancePropertyLine item)
        {
            _appDbContext.MaintenancePropertyLines.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenancePropertyLine[]> GetAllMaintenancePropertyLineAsync()
        {
            IQueryable<MaintenancePropertyLine> query = _appDbContext.MaintenancePropertyLines;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenancePropertyLine> GetMaintenancePropertyLineByID(int MaintenanceID, int PropertyLineID)
        {
            IQueryable<MaintenancePropertyLine> query = _appDbContext.MaintenancePropertyLines
                .Where(x => x.MaintenaceID == MaintenanceID && x.PropertyID == PropertyLineID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenancePropertyLine> DeleteMaintenancePropertyLineAsync(MaintenancePropertyLine item)
        {
            _appDbContext.MaintenancePropertyLines.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<MaintenanceNote> AddMaintenanceNote(MaintenanceNote item)
        {
            _appDbContext.MaintenanceNotes.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceNote[]> GetAllMaintenanceNoteAsync()
        {
            IQueryable<MaintenanceNote> query = _appDbContext.MaintenanceNotes;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceNote> GetMaintenanceNoteByID(int MaintenanceNoteID)
        {
            IQueryable<MaintenanceNote> query = _appDbContext.MaintenanceNotes
                .Where(x => x.MaintenaceNoteID == MaintenanceNoteID);
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
            _appDbContext.MaintenanceNotes.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<MaintenanceContractorLine> AddMaintenanceContractorLine(MaintenanceContractorLine item)
        {
            _appDbContext.MaintenanceContractorLines.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<MaintenanceContractorLine[]> GetAllMaintenanceContractorLineAsync()
        {
            IQueryable<MaintenanceContractorLine> query = _appDbContext.MaintenanceContractorLines;
            return await query.ToArrayAsync();
        }
        public async Task<MaintenanceContractorLine> GetMaintenanceContractorLineByID(int MaintenanceID, int ContractorLineID)
        {
            IQueryable<MaintenanceContractorLine> query = _appDbContext.MaintenanceContractorLines
                .Where(x => x.MaintenaceID == MaintenanceID && x.ContractorID == ContractorLineID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<MaintenanceContractorLine> DeleteMaintenanceContractorLineAsync(MaintenanceContractorLine item)
        {
            _appDbContext.MaintenanceContractorLines.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


        public async Task<Maintenance> AddMaintenance(Maintenance item)
        {
            _appDbContext.Maintenances.Add(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }
        public async Task<Maintenance[]> GetAllMaintenanceAsync()
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenances;
            return await query.ToArrayAsync();
        }
        public async Task<Maintenance> GetMaintenanceByID(int MaintenanceID)
        {
            IQueryable<Maintenance> query = _appDbContext.Maintenances
                .Where(x => x.MaintenaceID == MaintenanceID);
            return await query.FirstOrDefaultAsync();
        }
        public async Task<Maintenance> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, DateTime Time)
        {
            Maintenance x = await GetMaintenanceByID(MaintenanceId);
            if (x != null)
            {
                x.PropertyID = PropertyId;
                x.EmployeeID = EmployeeId;
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
            _appDbContext.Maintenances.Remove(item);
            await _appDbContext.SaveChangesAsync();
            return item;
        }


    }
}
