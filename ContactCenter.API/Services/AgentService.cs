using ContactCenter.API.Data;
using ContactCenter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactCenter.API.Services
{
    public class AgentService : IAgentService
    {
        private readonly ContactCenterContext _context;

        public AgentService(ContactCenterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Agent>> GetAgentsAsync(AgentStatus? status = null)
        {
            var query = _context.Agents.AsQueryable();
            
            if (status.HasValue)
                query = query.Where(a => a.Status == status.Value);
                
            return await query.ToListAsync();
        }

        public async Task<Agent> UpdateAgentStatusAsync(int id, AgentStatus newStatus)
        {
            var agent = await _context.Agents.FindAsync(id);
            if (agent == null)
                throw new KeyNotFoundException($"Agent with ID {id} not found");

            agent.Status = newStatus;
            agent.LastStatusChange = DateTime.Now;

            await _context.SaveChangesAsync();
            return agent;
        }
    }
}