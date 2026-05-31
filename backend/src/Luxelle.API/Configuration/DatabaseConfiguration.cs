using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.API.Configuration;

public static class DatabaseConfiguration
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, IConfiguration configuration)
    {
        var tursoUrl = configuration["TursoConnection:Url"];
        var tursoToken = configuration["TursoConnection:AuthToken"];

        // Try to get token from environment variable if not in config
        if (string.IsNullOrEmpty(tursoToken))
        {
            tursoToken = Environment.GetEnvironmentVariable("TursoConnection__AuthToken");
        }

        if (!string.IsNullOrEmpty(tursoUrl) && !string.IsNullOrEmpty(tursoToken))
        {
            // Production: Use Turso
            var connectionString = $"Data Source={tursoUrl};AuthToken={tursoToken}";
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(connectionString));
        }
        else
        {
            // Development: Use local SQLite
            services.AddDbContext<AppDbContext>(options =>
                options.UseSqlite(configuration.GetConnectionString("DefaultConnection")
                    ?? "Data Source=luxelle.db"));
        }

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
                logger.LogInformation("Ensuring database is created...");
                await db.Database.EnsureCreatedAsync();
                logger.LogInformation("Database ready");
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
