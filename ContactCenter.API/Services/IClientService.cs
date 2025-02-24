using ContactCenter.API.Models;

namespace ContactCenter.API.Services
{
    public interface IClientService
    {
        Task<IEnumerable<Client>> GetClientsAsync(int? minWaitTime = null);
        Task<Client> AddClientAsync(Client client);
    }
}
