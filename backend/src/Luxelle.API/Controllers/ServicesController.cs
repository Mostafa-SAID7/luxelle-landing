using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages beauty and wellness services
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class ServicesController : ControllerBase
{
    private readonly IServiceService _svc;
    public ServicesController(IServiceService svc) => _svc = svc;

    /// <summary>
    /// Get all services
    /// </summary>
    /// <returns>List of all services</returns>
    /// <response code="200">Returns the list of services</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllAsync());

    /// <summary>
    /// Get only available services
    /// </summary>
    /// <returns>List of available services</returns>
    /// <response code="200">Returns available services</response>
    [HttpGet("available")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAvailable() => Ok(await _svc.GetAvailableAsync());

    /// <summary>
    /// Get services by category
    /// </summary>
    /// <param name="category">Service category (e.g., Skincare, Massage, Nails, Hair)</param>
    /// <returns>Services in the specified category</returns>
    /// <response code="200">Returns services in category</response>
    [HttpGet("category/{category}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByCategory(string category) =>
        Ok(await _svc.GetByCategoryAsync(category));

    /// <summary>
    /// Get a specific service by ID
    /// </summary>
    /// <param name="id">Service ID</param>
    /// <returns>Service details</returns>
    /// <response code="200">Returns the service</response>
    /// <response code="404">Service not found</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var service = await _svc.GetByIdAsync(id);
        return service is null ? NotFound() : Ok(service);
    }

    /// <summary>
    /// Create a new service
    /// </summary>
    /// <param name="dto">Service creation data</param>
    /// <returns>Created service</returns>
    /// <response code="201">Service created successfully</response>
    /// <response code="400">Invalid input</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateServiceDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// Update an existing service
    /// </summary>
    /// <param name="id">Service ID</param>
    /// <param name="dto">Updated service data</param>
    /// <returns>Updated service</returns>
    /// <response code="200">Service updated successfully</response>
    /// <response code="404">Service not found</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, UpdateServiceDto dto)
    {
        var updated = await _svc.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Delete a service
    /// </summary>
    /// <param name="id">Service ID</param>
    /// <returns>No content</returns>
    /// <response code="204">Service deleted successfully</response>
    /// <response code="404">Service not found</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _svc.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
