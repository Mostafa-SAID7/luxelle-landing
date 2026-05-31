using Luxelle.API.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Add Services
builder.Services.AddApplicationServices();
builder.Services.AddCorsPolicy();
builder.Services.AddDatabaseContext(builder.Configuration);
builder.Services.AddRepositoriesAndServices();

var app = builder.Build();

// Log startup
var logger = app.Services.GetRequiredService<ILogger<Program>>();
logger.LogInformation("Application starting...");
logger.LogInformation("Environment: {Environment}", app.Environment.EnvironmentName);

// Initialize database
await app.InitializeDatabaseAsync();

// Configure middleware
app.UseSwaggerUI();
app.UseExceptionHandler("/error");
app.UseCorsPolicy();
app.UseAuthorization();
app.MapControllers();
app.MapCustomEndpoints();

app.Run();
