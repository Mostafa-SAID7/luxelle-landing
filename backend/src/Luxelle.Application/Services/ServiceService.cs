using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;

namespace Luxelle.Application.Services;

public class ServiceService : IServiceService
{
    private readonly IServiceRepository _repo;

    public ServiceService(IServiceRepository repo) => _repo = repo;

    public async Task<IEnumerable<ServiceDto>> GetAllAsync() =>
        (await _repo.GetAllAsync()).Select(MapToDto);

    public async Task<IEnumerable<ServiceDto>> GetAvailableAsync() =>
        (await _repo.GetAvailableAsync()).Select(MapToDto);

    public async Task<IEnumerable<ServiceDto>> GetByCategoryAsync(string category) =>
        (await _repo.GetByCategoryAsync(category)).Select(MapToDto);

    public async Task<ServiceDto?> GetByIdAsync(int id)
    {
        var svc = await _repo.GetByIdAsync(id);
        return svc is null ? null : MapToDto(svc);
    }

    public async Task<ServiceDto> CreateAsync(CreateServiceDto dto)
    {
        var service = new Service
        {
            Name = dto.Name,
            Description = dto.Description,
            Category = dto.Category,
            Price = dto.Price,
            DurationMinutes = dto.DurationMinutes,
            IsAvailable = true,
        };
        return MapToDto(await _repo.AddAsync(service));
    }

    public async Task<ServiceDto?> UpdateAsync(int id, UpdateServiceDto dto)
    {
        var service = await _repo.GetByIdAsync(id);
        if (service is null) return null;
        service.Name = dto.Name;
        service.Description = dto.Description;
        service.Category = dto.Category;
        service.Price = dto.Price;
        service.DurationMinutes = dto.DurationMinutes;
        service.IsAvailable = dto.IsAvailable;
        return MapToDto(await _repo.UpdateAsync(service));
    }

    public async Task<bool> DeleteAsync(int id)
    {
        if (await _repo.GetByIdAsync(id) is null) return false;
        await _repo.DeleteAsync(id);
        return true;
    }

    // ── Mapping ───────────────────────────────────────────────────────────────

    private static ServiceDto MapToDto(Service s) => new()
    {
        Id = s.Id,
        Name = s.Name,
        Description = s.Description,
        Category = s.Category,
        Icon = IconForCategory(s.Category),
        Price = s.Price,
        DurationMinutes = s.DurationMinutes,
        IsAvailable = s.IsAvailable,
    };

    private static string IconForCategory(string category) => category switch
    {
        "Skincare" => "sparkles",
        "Hair" => "scissors",
        "Makeup" => "palette",
        "Spa" => "droplet",
        "Massage" => "droplet",
        "Lashes" => "eye",
        "Nails" => "hand",
        "Facial" => "star",
        "Wellness" => "heart",
        _ => "sparkles",
    };
}
