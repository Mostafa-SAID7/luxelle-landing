using Luxelle.Application.DTOs;

namespace Luxelle.Application.Interfaces;

public interface IBookingService
{
    Task<IEnumerable<BookingDto>> GetAllAsync();
    Task<BookingDto?> GetByIdAsync(int id);
    Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId);
    Task<IEnumerable<BookingDto>> GetByDateRangeAsync(DateTime from, DateTime to);
    Task<BookingDto> CreateAsync(CreateBookingDto dto);
    Task<BookingDto?> UpdateAsync(int id, UpdateBookingDto dto);
    Task<bool> DeleteAsync(int id);
}
