using Luxelle.Application.DTOs;

namespace Luxelle.Application.Interfaces;

public interface IServiceService
{
    Task<IEnumerable<ServiceDto>> GetAllAsync();
    Task<IEnumerable<ServiceDto>> GetAvailableAsync();
    Task<IEnumerable<ServiceDto>> GetByCategoryAsync(string category);
    Task<ServiceDto?> GetByIdAsync(int id);
    Task<ServiceDto> CreateAsync(CreateServiceDto dto);
    Task<ServiceDto?> UpdateAsync(int id, UpdateServiceDto dto);
    Task<bool> DeleteAsync(int id);
}
