using ContactCenter.API.Models;
using ContactCenter.API.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ClientsController : ControllerBase
{
    private readonly IClientService _clientService;

    public ClientsController(IClientService clientService)
    {
        _clientService = clientService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Client>>> GetClients([FromQuery] int? minWaitTime = null)
    {
        var clients = await _clientService.GetClientsAsync(minWaitTime);
        return Ok(clients);
    }

    [HttpPost]
    public async Task<ActionResult<Client>> AddClient([FromBody] Client client)
    {
        var newClient = await _clientService.AddClientAsync(client);
        return CreatedAtAction(nameof(GetClients), new { id = newClient.Id }, newClient);
    }
}
