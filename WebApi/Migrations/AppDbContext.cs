using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Admin;
using WebApi.Models.Broker;
using WebApi.Models.Lease;
using WebApi.Models.Tenant;

namespace WebApi.Migrations
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Broker> Brokers { get; set; }
        public DbSet<Models.Property.Property> Properties { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Lease> Leases { get; set; }
        public DbSet<ContractorType> ContractorTypes { get; set; }
        public DbSet<SnagListItem> SnagListItems { get; set; }

        public async Task<bool> SaveChangesAsync()
        {
            return true;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
