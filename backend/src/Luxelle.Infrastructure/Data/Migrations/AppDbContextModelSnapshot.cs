using System;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Luxelle.Infrastructure.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.10");

            modelBuilder.Entity("Luxelle.Domain.Entities.Booking", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("AppointmentDate").HasColumnType("TEXT");
                b.Property<DateTime>("CreatedAt").HasColumnType("TEXT");
                b.Property<string>("Notes").HasColumnType("TEXT");
                b.Property<int>("ServiceId").HasColumnType("INTEGER");
                b.Property<string>("Status").IsRequired().HasColumnType("TEXT");
                b.Property<int>("UserId").HasColumnType("INTEGER");
                b.HasKey("Id");
                b.HasIndex("ServiceId");
                b.HasIndex("UserId");
                b.ToTable("Bookings");
            });

            modelBuilder.Entity("Luxelle.Domain.Entities.Service", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<string>("Category").IsRequired().HasMaxLength(50).HasColumnType("TEXT");
                b.Property<string>("Description").IsRequired().HasColumnType("TEXT");
                b.Property<int>("DurationMinutes").HasColumnType("INTEGER");
                b.Property<bool>("IsAvailable").HasColumnType("INTEGER");
                b.Property<string>("Name").IsRequired().HasMaxLength(100).HasColumnType("TEXT");
                b.Property<decimal>("Price").HasColumnType("decimal(10,2)");
                b.HasKey("Id");
                b.ToTable("Services");
                b.HasData(
                    new { Id = 1, Category = "Skincare", Description = "Deep cleansing facial with premium serums", DurationMinutes = 60, IsAvailable = true, Name = "Luxury Facial", Price = 120m },
                    new { Id = 2, Category = "Massage", Description = "Full body relaxation massage", DurationMinutes = 60, IsAvailable = true, Name = "Swedish Massage", Price = 90m },
                    new { Id = 3, Category = "Nails", Description = "Complete nail care with gel polish", DurationMinutes = 90, IsAvailable = true, Name = "Manicure & Pedicure", Price = 75m },
                    new { Id = 4, Category = "Hair", Description = "Deep conditioning and styling", DurationMinutes = 75, IsAvailable = true, Name = "Hair Treatment", Price = 85m });
            });

            modelBuilder.Entity("Luxelle.Domain.Entities.User", b =>
            {
                b.Property<int>("Id").ValueGeneratedOnAdd().HasColumnType("INTEGER");
                b.Property<DateTime>("CreatedAt").HasColumnType("TEXT");
                b.Property<string>("Email").IsRequired().HasMaxLength(150).HasColumnType("TEXT");
                b.Property<string>("FullName").IsRequired().HasMaxLength(100).HasColumnType("TEXT");
                b.Property<string>("PasswordHash").IsRequired().HasColumnType("TEXT");
                b.Property<string>("Phone").IsRequired().HasMaxLength(20).HasColumnType("TEXT");
                b.HasKey("Id");
                b.HasIndex("Email").IsUnique();
                b.ToTable("Users");
            });

            modelBuilder.Entity("Luxelle.Domain.Entities.Booking", b =>
            {
                b.HasOne("Luxelle.Domain.Entities.Service", "Service")
                    .WithMany("Bookings")
                    .HasForeignKey("ServiceId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
                b.HasOne("Luxelle.Domain.Entities.User", "User")
                    .WithMany("Bookings")
                    .HasForeignKey("UserId")
                    .OnDelete(DeleteBehavior.Cascade)
                    .IsRequired();
                b.Navigation("Service");
                b.Navigation("User");
            });

            modelBuilder.Entity("Luxelle.Domain.Entities.Service", b =>
            {
                b.Navigation("Bookings");
            });

            modelBuilder.Entity("Luxelle.Domain.Entities.User", b =>
            {
                b.Navigation("Bookings");
            });
#pragma warning restore 612, 618
        }
    }
}
