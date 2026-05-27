using Luxelle.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<User> Users => Set<User>();
    public DbSet<Service> Services => Set<Service>();
    public DbSet<Booking> Bookings => Set<Booking>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(e =>
        {
            e.HasKey(u => u.Id);
            e.Property(u => u.FullName).IsRequired().HasMaxLength(100);
            e.Property(u => u.Email).IsRequired().HasMaxLength(150);
            e.HasIndex(u => u.Email).IsUnique();
            e.Property(u => u.Phone).HasMaxLength(20);
        });

        modelBuilder.Entity<Service>(e =>
        {
            e.HasKey(s => s.Id);
            e.Property(s => s.Name).IsRequired().HasMaxLength(100);
            e.Property(s => s.Category).IsRequired().HasMaxLength(50);
            e.Property(s => s.Price).HasColumnType("decimal(10,2)");
        });

        modelBuilder.Entity<Booking>(e =>
        {
            e.HasKey(b => b.Id);
            e.HasOne(b => b.User).WithMany(u => u.Bookings).HasForeignKey(b => b.UserId);
            e.HasOne(b => b.Service).WithMany(s => s.Bookings).HasForeignKey(b => b.ServiceId);
            e.Property(b => b.Status).HasConversion<string>();
        });

        modelBuilder.Entity<Service>().HasData(
            new Service { Id = 1, Name = "Luxury Facial", Description = "Deep cleansing facial with premium serums", Category = "Skincare", Price = 120, DurationMinutes = 60, IsAvailable = true },
            new Service { Id = 2, Name = "Swedish Massage", Description = "Full body relaxation massage", Category = "Massage", Price = 90, DurationMinutes = 60, IsAvailable = true },
            new Service { Id = 3, Name = "Manicure & Pedicure", Description = "Complete nail care with gel polish", Category = "Nails", Price = 75, DurationMinutes = 90, IsAvailable = true },
            new Service { Id = 4, Name = "Hair Treatment", Description = "Deep conditioning and styling", Category = "Hair", Price = 85, DurationMinutes = 75, IsAvailable = true }
        );
    }
}
