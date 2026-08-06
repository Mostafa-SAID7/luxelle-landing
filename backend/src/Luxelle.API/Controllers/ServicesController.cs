using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages beauty and wellness services
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _svc;
    public ServicesController(IServiceService svc) => _svc = svc;

    /// <summary>
    /// Get all services
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllAsync());

    /// <summary>
    /// Get only available services
    /// </summary>
    [HttpGet("available")]
    public async Task<IActionResult> GetAvailable() => Ok(await _svc.GetAvailableAsync());

    /// <summary>
    /// Get services by category
    /// </summary>
    [HttpGet("category/{category}")]
    public async Task<IActionResult> GetByCategory(string category) =>
        Ok(await _svc.GetByCategoryAsync(category));

    /// <summary>
    /// Get a specific service by ID
    /// </summary>
    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var service = await _svc.GetByIdAsync(id);
        return service is null ? NotFound() : Ok(service);
    }

    /// <summary>
    /// Create a new service
    /// </summary>
    [HttpPost]
    public async Task<IActionResult> Create(CreateServiceDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// Update an existing service
    /// </summary>
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, UpdateServiceDto dto)
    {
        var updated = await _svc.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Delete a service
    /// </summary>
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _svc.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
