using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Admin;
using WebApi.Models.Data;
using WebApi.Models.Lease;
using WebApi.Models;
using WebApi.Models.Maintenance;

namespace WebApi.Models
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Property.Property> Properties { get; set; }
        public DbSet<Data.Data> Data { get; set; }
        public DbSet<Data.DataType> DataType { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Lease.Lease> Leases { get; set; }
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
        public DbSet<MaintenanceContractorLine>MaintenanceContractorLines { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
