using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.API.Configuration;

public static class DatabaseConfiguration
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        if (string.IsNullOrEmpty(connectionString))
        {
            throw new InvalidOperationException("Connection string 'DefaultConnection' not found in configuration.");
        }

        services.AddDbContext<AppDbContext>(options =>
            options.UseSqlServer(connectionString));

        return services;
    }

    public static async Task InitializeDatabaseAsync(this IApplicationBuilder app)
    {
        using (var scope = app.ApplicationServices.CreateScope())
        {
            var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
            try
            {
                var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                logger.LogInformation("Checking database connection...");
                
                // Test connection
                await db.Database.CanConnectAsync();
                logger.LogInformation("Database connection successful");
                
                // Create database if it doesn't exist
                logger.LogInformation("Ensuring database is created...");
                await db.Database.EnsureCreatedAsync();
                
                // Verify tables exist
                var users = await db.Users.CountAsync();
                var services = await db.Services.CountAsync();
                var bookings = await db.Bookings.CountAsync();
                
                logger.LogInformation("Database ready - Users: {UserCount}, Services: {ServiceCount}, Bookings: {BookingCount}", 
                    users, services, bookings);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error during database initialization - continuing anyway");
                // Don't throw - allow app to start even if DB init fails
                // This allows the /health endpoint to work for diagnostics
            }
        }
    }
}
