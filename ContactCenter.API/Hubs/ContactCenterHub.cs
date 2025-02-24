using Microsoft.AspNetCore.SignalR;

namespace ContactCenter.API.Hubs
{
    public class ContactCenterHub : Hub
    {
        public async Task AgentStatusUpdated(Models.Agent agent)
        {
            await Clients.All.SendAsync("AgentUpdated", agent);
        }

        public async Task ClientQueueUpdated(Models.Client client)
        {
            await Clients.All.SendAsync("ClientUpdated", client);
        }
    }
}