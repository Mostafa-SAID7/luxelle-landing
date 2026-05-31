using Luxelle.Application.DTOs;
using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Manages user accounts and customer information
/// </summary>
[ApiController]
[Route("api/[controller]")]
[Produces("application/json")]
public class UsersController : ControllerBase
{
    private readonly IUserService _svc;
    public UsersController(IUserService svc) => _svc = svc;

    /// <summary>
    /// Get all users
    /// </summary>
    /// <returns>List of all users</returns>
    /// <response code="200">Returns the list of users</response>
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllAsync());

    /// <summary>
    /// Get a specific user by ID
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns>User details</returns>
    /// <response code="200">Returns the user</response>
    /// <response code="404">User not found</response>
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _svc.GetByIdAsync(id);
        return user is null ? NotFound() : Ok(user);
    }

    /// <summary>
    /// Create a new user
    /// </summary>
    /// <param name="dto">User creation data</param>
    /// <returns>Created user</returns>
    /// <response code="201">User created successfully</response>
    /// <response code="400">Invalid input</response>
    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create(CreateUserDto dto)
    {
        var created = await _svc.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    /// <summary>
    /// Update an existing user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <param name="dto">Updated user data</param>
    /// <returns>Updated user</returns>
    /// <response code="200">User updated successfully</response>
    /// <response code="404">User not found</response>
    [HttpPut("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, UpdateUserDto dto)
    {
        var updated = await _svc.UpdateAsync(id, dto);
        return updated is null ? NotFound() : Ok(updated);
    }

    /// <summary>
    /// Delete a user
    /// </summary>
    /// <param name="id">User ID</param>
    /// <returns>No content</returns>
    /// <response code="204">User deleted successfully</response>
    /// <response code="404">User not found</response>
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _svc.DeleteAsync(id);
        return deleted ? NoContent() : NotFound();
    }
}
