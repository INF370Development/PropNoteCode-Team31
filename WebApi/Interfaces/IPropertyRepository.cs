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
    }
}
