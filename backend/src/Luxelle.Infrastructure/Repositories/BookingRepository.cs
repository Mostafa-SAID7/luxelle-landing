using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class BookingRepository : IBookingRepository
{
    private readonly AppDbContext _ctx;

    public BookingRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<Booking>> GetAllAsync() =>
        await _ctx.Bookings.Include(b => b.User).Include(b => b.Service).ToListAsync();

    public async Task<Booking?> GetByIdAsync(int id) =>
        await _ctx.Bookings.Include(b => b.User).Include(b => b.Service)
            .FirstOrDefaultAsync(b => b.Id == id);

    public async Task<IEnumerable<Booking>> GetByUserIdAsync(int userId) =>
        await _ctx.Bookings.Include(b => b.User).Include(b => b.Service)
            .Where(b => b.UserId == userId).ToListAsync();

    public async Task<IEnumerable<Booking>> GetByServiceIdAsync(int serviceId) =>
        await _ctx.Bookings.Include(b => b.User).Include(b => b.Service)
            .Where(b => b.ServiceId == serviceId).ToListAsync();

    public async Task<IEnumerable<Booking>> GetByDateRangeAsync(DateTime from, DateTime to) =>
        await _ctx.Bookings.Include(b => b.User).Include(b => b.Service)
            .Where(b => b.AppointmentDate >= from && b.AppointmentDate <= to).ToListAsync();

    public async Task<Booking> AddAsync(Booking entity)
    {
        _ctx.Bookings.Add(entity);
        await _ctx.SaveChangesAsync();
        return entity;
    }

    public async Task<Booking> UpdateAsync(Booking entity)
    {
        _ctx.Bookings.Update(entity);
        await _ctx.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var booking = await _ctx.Bookings.FindAsync(id);
        if (booking is not null)
        {
            _ctx.Bookings.Remove(booking);
            await _ctx.SaveChangesAsync();
        }
    }
}
