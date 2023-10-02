using Microsoft.EntityFrameworkCore;
using WebApi.Models.Maintenance;

namespace WebApi.Interfaces
{
    public interface IMaintenanceRepository
    {

        Task<bool> SaveChangesAsync();

        Task<Payment> AddPayment(Payment item);
        Task<Payment[]> GetAllPaymentAsync();
        Task<Payment> GetPaymentByID(int PaymentID);
        Task<Payment> EditPayment(int PaymentId, int MaintenanceId, decimal amount);
        Task<Payment> DeletePaymentAsync(Payment item);
        Task<IEnumerable<Maintenance>> GetMaintenanceByPropertyID(int propertyId);
        Task<MaintenanceType> AddMaintenanceType(MaintenanceType item);
        Task<MaintenanceType[]> GetAllMaintenanceTypeAsync();
        Task<MaintenanceType> GetMaintenanceTypeByID(int MaintenanceTypeID);
        Task<MaintenanceType> EditMaintenanceType(int MaintenanceTypeId, string MaintenanceTypeName);
        Task<MaintenanceType> DeleteMaintenanceTypeAsync(MaintenanceType item);

        Task<MaintenanceStatus> AddMaintenanceStatus(MaintenanceStatus item);
        Task<MaintenanceStatus[]> GetAllMaintenanceStatusAsync();
        Task<MaintenanceStatus> GetMaintenanceStatusByID(int MaintenanceStatusID);
        Task<MaintenanceStatus> EditMaintenanceStatus(int MaintenanceStatusId, string MaintenanceStatusName);
        Task<MaintenanceStatus> DeleteMaintenanceStatusAsync(MaintenanceStatus item);
        Task<List<MaintenanceNote>> GetMaintenanceNotesByMaintenanceIDAsync(int maintenanceID);
        Task<MaintenanceNote> AddMaintenanceNote(MaintenanceNote item);
        Task<MaintenanceNote[]> GetAllMaintenanceNoteAsync();
        Task<MaintenanceNote> GetMaintenanceNoteByID(int maintenanceNoteID);
        Task<MaintenanceNote> EditMaintenanceNote(int MaintenanceNoteId, int maintenance, string MaintenanceNoteDescription);
        Task<MaintenanceNote> DeleteMaintenanceNoteAsync(MaintenanceNote item);
        Task<Maintenance> UpdateMaintenanceAsync(Maintenance maintenance);
        Task<Maintenance> AddMaintenance(Maintenance item);
        Task<Maintenance[]> GetAllMaintenanceAsync();
        Task<Maintenance> GetMaintenanceByID(int MaintenanceID);
        Task<Maintenance> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, string Time);
        Task<Maintenance> DeleteMaintenanceAsync(Maintenance item);

        Task<Maintenance> GetMaintenanceAsync(int maintenanceID);
    }
}
