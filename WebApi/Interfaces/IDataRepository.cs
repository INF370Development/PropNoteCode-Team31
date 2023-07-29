using WebApi.Models.Data;

namespace WebApi.Interfaces
{
    public interface IDataRepository
    {
        Task<bool> SaveChangesAsync();

        void Add<T>(T entity) where T : class;

        Task AddData(Data data);

        Task<Data[]> GetAllDataAsync();

        Task AddDataType(DataType dataType);

        Task<DataType[]> GetAllDataTypesAsync();
        Task EditData(int dataID, Data data);
        Task DeleteData(Data data);
        Task EditDataType(int dataTypeID, DataType dataType);
        Task DeleteDataType(DataType dataType);
        void Delete<T>(T entity) where T : class;
    }
}
