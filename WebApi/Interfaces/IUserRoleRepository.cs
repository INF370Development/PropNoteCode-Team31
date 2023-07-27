namespace WebApi.Interfaces
{
    public interface IUserRoleRepository
    {
        Task<bool> SaveChangesAsync();

        public void Add<T>(T entity) where T : class;
    }
}