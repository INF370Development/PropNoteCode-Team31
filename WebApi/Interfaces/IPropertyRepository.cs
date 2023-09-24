using WebApi.Models.Property;

namespace WebApi.Interfaces
{
    public interface IPropertyRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task AddProperty(Property property);

        Task<Property[]> GetAllPropertiesAsync();
        Task EditProperty(int propertyID, Property property);
        Task DeleteProperty(Property property);
        void Delete<T>(T entity) where T : class;
        Task<Property> GetPropertyByIDAsync(int propertyID);
        Task<List<Inspection>> GetAllInspectionsForPropertyAsync(int propertyID);
        Task AddInspection(Inspection inspection);
        Task<Inspection> GetInspectionByIDAsync(int inspectionID);
        void DeleteInspection(Inspection inspection);
        Task<List<Recovery>> GetAllRecoveriesForPropertyAsync(int propertyID);
        Task AddRecovery(Recovery recovery);
        Task<Recovery> GetRecoveryByIDAsync(int recoveryID);
        void DeleteRecovery(Recovery recovery);
        Task<InspectionType[]> GetAllInspectionTypesAsync();
        Task AddInspectionType(InspectionType inspectionType);
        Task<InspectionStatus[]> GetAllInspectionStatusesAsync();
        Task AddInspectionStatus(InspectionStatus inspectionStatus);
        Task<InspectionType> GetInspectionTypeByIDAsync(int inspectionTypeID);
        Task<InspectionStatus> GetInspectionStatusByIDAsync(int inspectionStatusID);
        Task<RecoveryType[]> GetAllRecoveryTypesAsync();
        Task AddRecoveryType(RecoveryType recoveryType);
        Task<RecoveryType> GetRecoveryTypeByIDAsync(int recoveryTypeID);
        Task<Recovery[]> GetAllRecoveriesAsync();
        Task<Inspection[]> GetAllInspectionsAsync();
        Task AddProblemStatus(ProblemStatus problemStatus);
        Task AddProblem(Problem problem);
        Task<ProblemStatus[]> GetAllProblemStatusesAsync();
        Task<Problem> GetProblemByIDAsync(int problemID);
    }
}
