using Luxelle.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Luxelle.API.Controllers;

/// <summary>
/// Returns membership / subscription pricing tiers
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class PricingController : ControllerBase
{
    private readonly IPricingTierService _svc;
    public PricingController(IPricingTierService svc) => _svc = svc;

    /// <summary>
    /// Get all pricing tiers ordered by display order
    /// </summary>
    [HttpGet]
    public async Task<IActionResult> GetAll() => Ok(await _svc.GetAllAsync());
}
