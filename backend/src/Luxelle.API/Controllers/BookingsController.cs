using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages service bookings and reservations
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class BookingsController : ControllerBase
{
    private readonly IBookingService _svc;
    public BookingsController(IBookingService svc) => _svc = svc;

    /// <summary>
    /// Get all bookings
    /// </summary>
    /// <returns>List of all bookings</returns>
    /// <response code="200">Returns the list of bookings</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllAsync());

    /// <summary>
    /// Get a specific booking by ID
    /// </summary>
    /// <param name="id">Booking ID</param>
    /// <returns>Booking details</returns>
    /// <response code="200">Returns the booking</response>
    /// <response code="404">Booking not found</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var booking = await _svc.GetByIdAsync(id);
        return booking is null ? NotFound() : Ok(booking);
    }

    /// <summary>
    /// Get all bookings for a specific user
    /// </summary>
    /// <param name="userId">User ID</param>
    /// <returns>User's bookings</returns>
    /// <response code="200">Returns user's bookings</response>
    [HttpGet("user/{userId:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByUser(int userId) =>
        Ok(await _svc.GetByUserIdAsync(userId));

    /// <summary>
    /// Get bookings within a date range
    /// </summary>
    /// <param name="from">Start date (ISO 8601 format)</param>
    /// <param name="to">End date (ISO 8601 format)</param>
    /// <returns>Bookings in the date range</returns>
    /// <response code="200">Returns bookings in range</response>
    [HttpGet("range")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetByDateRange([FromQuery] DateTime from, [FromQuery] DateTime to) =>
        Ok(await _svc.GetByDateRangeAsync(from, to));

    /// <summary>
    /// Create a new booking
    /// </summary>
    /// <param name="dto">Booking creation data</param>
    /// <returns>Created booking</returns>
    /// <response code="201">Booking created successfully</response>
    /// <response code="400">Invalid input</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateBookingDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// Update an existing booking
    /// </summary>
    /// <param name="id">Booking ID</param>
    /// <param name="dto">Updated booking data</param>
    /// <returns>Updated booking</returns>
    /// <response code="200">Booking updated successfully</response>
    /// <response code="404">Booking not found</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, UpdateBookingDto dto)
    {
        var updated = await _svc.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Delete a booking
    /// </summary>
    /// <param name="id">Booking ID</param>
    /// <returns>No content</returns>
    /// <response code="204">Booking deleted successfully</response>
    /// <response code="404">Booking not found</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _svc.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
