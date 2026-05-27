using Luxelle.Domain.Entities;

namespace Luxelle.Domain.Interfaces;

public interface IBookingRepository : IRepository<Booking>
{
    Task<IEnumerable<Booking>> GetByUserIdAsync(int userId);
    Task<IEnumerable<Booking>> GetByServiceIdAsync(int serviceId);
    Task<IEnumerable<Booking>> GetByDateRangeAsync(DateTime from, DateTime to);
}
