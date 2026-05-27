using Luxelle.Domain.Entities;
using Luxelle.Domain.Interfaces;
using Luxelle.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace Luxelle.Infrastructure.Repositories;

public class ServiceRepository : IServiceRepository
{
    private readonly AppDbContext _ctx;

    public ServiceRepository(AppDbContext ctx) => _ctx = ctx;

    public async Task<IEnumerable<Service>> GetAllAsync() =>
        await _ctx.Services.ToListAsync();

    public async Task<Service?> GetByIdAsync(int id) =>
        await _ctx.Services.FindAsync(id);

    public async Task<IEnumerable<Service>> GetByCategoryAsync(string category) =>
        await _ctx.Services.Where(s => s.Category == category).ToListAsync();

    public async Task<IEnumerable<Service>> GetAvailableAsync() =>
        await _ctx.Services.Where(s => s.IsAvailable).ToListAsync();

    public async Task<Service> AddAsync(Service entity)
    {
        _ctx.Services.Add(entity);
        await _ctx.SaveChangesAsync();
        return entity;
    }

    public async Task<Service> UpdateAsync(Service entity)
    {
        _ctx.Services.Update(entity);
        await _ctx.SaveChangesAsync();
        return entity;
    }

    public async Task DeleteAsync(int id)
    {
        var service = await _ctx.Services.FindAsync(id);
        if (service is not null)
        {
            _ctx.Services.Remove(service);
            await _ctx.SaveChangesAsync();
        }
    }
}
