using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Admin;
using WebApi.Models.Data;
using WebApi.Models.Lease;
using WebApi.Models;
using WebApi.Models.Maintenance;
using WebApi.Models.Users;

namespace WebApi.Models
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Property.Property> Property { get; set; }
        public DbSet<Data.Data> Data { get; set; }
        public DbSet<Data.DataType> DataType { get; set; }
        public DbSet<Tenant> Tenant { get; set; }
        public DbSet<Lease.Lease> Lease { get; set; }
        public DbSet<Deposit> Deposit { get; set; }
        public DbSet<ContractorType> ContractorTypes { get; set; }
        public DbSet<SnagListItem> SnagListItems { get; set; }
        public DbSet<SnagList> SnagList { get; set; }
        public DbSet<Broker> Broker { get; set; }
        public DbSet<SnagListItemLine> SnagListItemLine { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<MaintenanceType> MaintenanceTypes { get; set; }
        public DbSet<MaintenanceStatus>MaintenanceStatuses { get; set; }
        public DbSet<MaintenancePropertyLine>MaintenancePropertyLines { get; set; }
        public DbSet<MaintenanceNote>MaintenanceNotes { get; set; }
        public DbSet<Maintenance.Maintenance> Maintenances { get; set; }
        public DbSet<MaintenanceContractorLine> MaintenanceContractorLines { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Employee> Employee { get; set; }

        public DbSet<Role> Role { get; set; }

        public DbSet<UserRole> UserRole { get; set; }




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
