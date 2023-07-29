using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using WebApi.Models.Admin;
using WebApi.Models.Lease;
using WebApi.Models.Tenant;

namespace WebApi.Migrations
{
    public class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Property> Properties { get; set; }
        public DbSet<Tenant> Tenants { get; set; }
        public DbSet<Lease> Leases { get; set; }
        public DbSet<ContractorType> ContractorTypes { get; set; }
        public DbSet<SnagListItem> SnagListItems { get; set; }
        public DbSet<SnagList> SnagList { get; set; }
        public DbSet<Broker> Broker { get; set; }
        public DbSet<SnagListItemLine> SnagListItemLine { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}
