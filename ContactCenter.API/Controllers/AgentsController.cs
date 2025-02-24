using Microsoft.AspNetCore.Mvc;
using ContactCenter.API.Models;
using ContactCenter.API.Services;
using ContactCenter.API.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ContactCenter.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AgentsController : ControllerBase
    {
        private readonly IAgentService _agentService;
        private readonly IHubContext<ContactCenterHub> _hubContext;

        public AgentsController(IAgentService agentService, IHubContext<ContactCenterHub> hubContext)
        {
            _agentService = agentService;
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Agent>>> GetAgents([FromQuery] AgentStatus? status = null)
        {
            var agents = await _agentService.GetAgentsAsync(status);
            return Ok(agents);
        }

        [HttpPut("{id}/status")]
        public async Task<IActionResult> UpdateStatus(int id, [FromBody] UpdateAgentStatusRequest request)
        {
            try
            {
                var updatedAgent = await _agentService.UpdateAgentStatusAsync(id, request.Status);
                await _hubContext.Clients.All.SendAsync("AgentUpdated", updatedAgent);
                return Ok(updatedAgent);
            }
            catch (KeyNotFoundException)
            {
                return NotFound($"Agent with ID {id} not found");
            }
        }
    }

    public class UpdateAgentStatusRequest
    {
        public AgentStatus Status { get; set; }
    }
}