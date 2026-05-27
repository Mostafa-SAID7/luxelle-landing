using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;

namespace Luxelle.Application.Services;

public class BookingService : IBookingService
{
    private readonly IBookingRepository _repo;

    public BookingService(IBookingRepository repo) => _repo = repo;

    public async Task<IEnumerable<BookingDto>> GetAllAsync() =>
        (await _repo.GetAllAsync()).Select(MapToDto);

    public async Task<BookingDto?> GetByIdAsync(int id)
    {
        var booking = await _repo.GetByIdAsync(id);
        return booking is null ? null : MapToDto(booking);
    }

    public async Task<IEnumerable<BookingDto>> GetByUserIdAsync(int userId) =>
        (await _repo.GetByUserIdAsync(userId)).Select(MapToDto);

    public async Task<IEnumerable<BookingDto>> GetByDateRangeAsync(DateTime from, DateTime to) =>
        (await _repo.GetByDateRangeAsync(from, to)).Select(MapToDto);

    public async Task<BookingDto> CreateAsync(CreateBookingDto dto)
    {
        var booking = new Booking
        {
            UserId = dto.UserId,
            ServiceId = dto.ServiceId,
            AppointmentDate = dto.AppointmentDate,
            Notes = dto.Notes,
            Status = BookingStatus.Pending
        };
        var created = await _repo.AddAsync(booking);
        var full = await _repo.GetByIdAsync(created.Id);
        return MapToDto(full!);
    }

    public async Task<BookingDto?> UpdateAsync(int id, UpdateBookingDto dto)
    {
        var booking = await _repo.GetByIdAsync(id);
        if (booking is null) return null;
        booking.AppointmentDate = dto.AppointmentDate;
        booking.Status = dto.Status;
        booking.Notes = dto.Notes;
        await _repo.UpdateAsync(booking);
        var full = await _repo.GetByIdAsync(id);
        return MapToDto(full!);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var booking = await _repo.GetByIdAsync(id);
        if (booking is null) return false;
        await _repo.DeleteAsync(id);
        return true;
    }

    private static BookingDto MapToDto(Booking b) => new()
    {
        Id = b.Id,
        UserId = b.UserId,
        UserName = b.User?.FullName ?? string.Empty,
        ServiceId = b.ServiceId,
        ServiceName = b.Service?.Name ?? string.Empty,
        AppointmentDate = b.AppointmentDate,
        Status = b.Status,
        Notes = b.Notes,
        CreatedAt = b.CreatedAt
    };
}
