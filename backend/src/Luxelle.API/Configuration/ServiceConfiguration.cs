namespace Luxelle.API.Configuration;

public static class ServiceConfiguration
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddSwaggerGen(options =>
        {
            options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
            {
                Title = "Luxelle API",
                Version = "v1",
                Description = "Premium Beauty & Wellness Center API"
            });
        });

        return services;
    }
}
