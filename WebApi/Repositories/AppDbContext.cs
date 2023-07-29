using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Broker;
using WebApi.Models.Lease;
using WebApi.Models.Data;
using WebApi.Models;
using WebApi.Models.Users;
using WebApi.Models.Calendar;

namespace WebApi.Repositories
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Broker> Broker { get; set; }
        public DbSet<Models.Property.Property> Property { get; set; }
        public DbSet<Tenant> Tenant { get; set; }
        public DbSet<Lease> Lease { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Data> Data { get; set; }
        public DbSet<DataType> DataType { get; set; }
        public DbSet<Employee> Employee { get; set; }
        public DbSet<Deposit> Deposit { get; set; }
        public DbSet<Calendar> Notification { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
