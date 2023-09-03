using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Broker;
using WebApi.Models.Lease;
using WebApi.Models.Data;
using WebApi.Models;
using WebApi.Models.Users;
using WebApi.Models.Property;
using WebApi.Models.Admin;
using WebApi.Models.Maintenance;

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
        public DbSet<PropertyImage> PropertyImage { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Inspection> Inspection { get; set; }
        public DbSet<UserRole> UserRole { get; set; }
       /* public DbSet<SnagListItem> SnagListItem { get; set; }
        public DbSet<SnagList> SnagList { get; set; }
        public DbSet<SnagListItemLine> SnagListItemLine { get; set; }*/
        public DbSet<Payment> Payment { get; set; }
        public DbSet<MaintenanceType> MaintenanceType { get; set; }
        public DbSet<MaintenanceStatus> MaintenanceStatus { get; set; }
        public DbSet<MaintenanceNote> MaintenanceNote { get; set; }
        public DbSet<Maintenance> Maintenance { get; set; }
        public DbSet<Recovery> Recovery { get; set; }
        public DbSet<Access> Access { get; set; }
        public DbSet<UserAccess> UserAccess { get; set; }
        public DbSet<Contractor> Contractor { get; set; }
        public DbSet<ContractorType> ContractorType { get; set; }
        public DbSet<InspectionType> InspectionType { get; set; }
        public DbSet<InspectionStatus> InspectionStatus { get; set; }
        public DbSet<RecoveryType> RecoveryType { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserID, ur.RoleID });

            modelBuilder.Entity<UserAccess>()
                .HasKey(ua => new { ua.RoleID, ua.AccessID });

            modelBuilder.Entity<Role>()
                .HasMany(u => u.UserRoles)
                .WithOne()
                .HasForeignKey(ur => ur.RoleID)
                .IsRequired();

            modelBuilder.Entity<Access>()
                .HasMany(a => a.UserAccesses)
                .WithOne()
                .HasForeignKey(ua => ua.AccessID)
                .IsRequired();

           
        }

    }
}
