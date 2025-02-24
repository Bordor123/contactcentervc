using ContactCenter.API.Data;
using ContactCenter.API.Models;
using Microsoft.EntityFrameworkCore;

namespace ContactCenter.API.Services
{
    public class ClientService : IClientService
    {
        private readonly ContactCenterContext _context;

        public ClientService(ContactCenterContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Client>> GetClientsAsync(int? minWaitTime = null)
        {
            var query = _context.Clients.AsQueryable();

            if (minWaitTime.HasValue)
                query = query.Where(c => c.WaitTime >= minWaitTime.Value);

            return await query.ToListAsync();
        }

        public async Task<Client> AddClientAsync(Client client)
        {
            _context.Clients.Add(client);
            await _context.SaveChangesAsync();
            return client;
        }
    }
}
