using Luxelle.Application.Interfaces;
using Luxelle.Application.Services;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Luxelle.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Luxelle API",
        Version = "v1",
        Description = "Premium Beauty & Wellness Center API"
    });
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Use Turso (LibSQL) in production, SQLite in development
var tursoUrl = builder.Configuration["TursoConnection:Url"];
var tursoToken = builder.Configuration["TursoConnection:AuthToken"];

// Try to get token from environment variable if not in config
if (string.IsNullOrEmpty(tursoToken))
{
    tursoToken = Environment.GetEnvironmentVariable("TursoConnection__AuthToken");
}

if (!string.IsNullOrEmpty(tursoUrl) && !string.IsNullOrEmpty(tursoToken))
{
    // Production: Use Turso
    var connectionString = $"Data Source={tursoUrl};AuthToken={tursoToken}";
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(connectionString));
}
else
{
    // Development: Use local SQLite
    builder.Services.AddDbContext<AppDbContext>(options =>
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")
            ?? "Data Source=luxelle.db"));
}

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IServiceRepository, ServiceRepository>();
builder.Services.AddScoped<IBookingRepository, BookingRepository>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IBookingService, BookingService>();

var app = builder.Build();

// Log startup information
var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Application starting...");
logger.LogInformation("Environment: {Environment}", app.Environment.EnvironmentName);

using (var scope = app.Services.CreateScope())
{
    try
    {
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        logger.LogInformation("Ensuring database is created...");
        db.Database.EnsureCreated();
        logger.LogInformation("Database ready");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error during database initialization");
        throw;
    }
}

// Enable Swagger
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Luxelle API v1");
    options.RoutePrefix = string.Empty;
    options.DocumentTitle = "Luxelle API";
});

app.UseExceptionHandler("/error");
app.MapGet("/error", () => Results.Problem("An error occurred", statusCode: 500));

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }));

app.Run();
