using ContactCenter.API.Models;

namespace ContactCenter.API.Services
{
    public interface IAgentService
    {
        Task<IEnumerable<Agent>> GetAgentsAsync(AgentStatus? status = null);
        Task<Agent> UpdateAgentStatusAsync(int id, AgentStatus newStatus);
    }
}