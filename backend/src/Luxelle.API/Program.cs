using Luxelle.Application.Interfaces;
using Luxelle.Application.Services;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Luxelle.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "Luxelle API",
        Version = "v1",
        Description = "Premium Beauty & Wellness Center API",
        Contact = new Microsoft.OpenApi.Models.OpenApiContact
        {
            Name = "Luxelle Support",
            Email = "support@luxelle.com"
        },
        License = new Microsoft.OpenApi.Models.OpenApiLicense
        {
            Name = "MIT",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });

    // Include XML comments if available
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
    {
        options.IncludeXmlComments(xmlPath);
    }
});

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular", policy =>
        policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

// Use Turso (LibSQL) in production, SQLite in development
var tursoUrl = builder.Configuration["TursoConnection:Url"];
var tursoToken = builder.Configuration["TursoConnection:AuthToken"];

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

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

// Enable Swagger in all environments for API documentation
app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Luxelle API v1");
    options.RoutePrefix = string.Empty; // Serve Swagger UI at root
    options.DocumentTitle = "Luxelle API Documentation";
});

// Add error handling middleware
app.UseExceptionHandler("/error");

app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

// Health check endpoint
app.MapGet("/health", () => Results.Ok(new { status = "healthy", timestamp = DateTime.UtcNow }))
    .WithName("Health")
    .WithOpenApi()
    .Produces(200);

app.Run();
