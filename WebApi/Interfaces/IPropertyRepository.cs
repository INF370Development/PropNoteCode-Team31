using WebApi.Models.Property;

namespace WebApi.Interfaces
{
    public interface IPropertyRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task AddProperty(Property property);

        Task<Property[]> GetAllPropertiesAsync();
    }
}
