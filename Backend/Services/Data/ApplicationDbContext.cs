using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models.Entities;
using Models.Entities.Configurations;

namespace Services.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Element> Elements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            new ElementConfiguration().Configure(modelBuilder.Entity<Element>());
        }
    }
}
// Add-Migration InitialCreate -Project Services -StartupProject API -OutputDir Data\Migrations -Context ApplicationDbContext
// Update-Database -Project Services -StartupProject API -Context ApplicationDbContext
// Drop-Database -Project Services -StartupProject API -Context ApplicationDbContext