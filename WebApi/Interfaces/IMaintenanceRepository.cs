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
        Task<Payment> EditPayment(int PaymentId, int MaintenanceId, string amoun);
        Task<Payment> DeletePaymentAsync(Payment item);

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

        Task<MaintenanceNote> AddMaintenanceNote(MaintenanceNote item);
        Task<MaintenanceNote[]> GetAllMaintenanceNoteAsync();
        Task<MaintenanceNote> GetMaintenanceNoteByID(int MaintenanceNoteID);
        Task<MaintenanceNote> EditMaintenanceNote(int MaintenanceNoteId, int maintenance, string MaintenanceNoteDescription);
        Task<MaintenanceNote> DeleteMaintenanceNoteAsync(MaintenanceNote item);

        Task<Maintenance> AddMaintenance(Maintenance item);
        Task<Maintenance[]> GetAllMaintenanceAsync();
        Task<Maintenance> GetMaintenanceByID(int MaintenanceID);
        Task<Maintenance> EditMaintenance(int MaintenanceId, int PropertyId, int EmployeeId, int ContractorId, int MaintenanceStatusId, int MaintenanceTypeId, DateTime Date, TimeSpan Time);
        Task<Maintenance> DeleteMaintenanceAsync(Maintenance item);


    }
}
