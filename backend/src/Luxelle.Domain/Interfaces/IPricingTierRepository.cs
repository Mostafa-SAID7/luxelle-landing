using Luxelle.Domain.Entities;

namespace Luxelle.Domain.Interfaces;

public interface IPricingTierRepository
{
    Task<IEnumerable<PricingTier>> GetAllAsync();
    Task<bool> AnyAsync();
    Task AddRangeAsync(IEnumerable<PricingTier> tiers);
}
