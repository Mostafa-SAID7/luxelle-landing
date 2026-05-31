using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class PricingTierRepository : IPricingTierRepository
{
    private readonly AppDbContext _ctx;

    public PricingTierRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<PricingTier>> GetAllAsync() =>
        await _ctx.PricingTiers.OrderBy(p => p.DisplayOrder).ToListAsync();

    public async Task<bool> AnyAsync() =>
        await _ctx.PricingTiers.AnyAsync();

    public async Task AddRangeAsync(IEnumerable<PricingTier> tiers)
    {
        await _ctx.PricingTiers.AddRangeAsync(tiers);
        await _ctx.SaveChangesAsync();
    }
}
