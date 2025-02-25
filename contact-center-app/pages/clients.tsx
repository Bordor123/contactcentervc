import { useState, useEffect } from 'react';
import { getClients, addClient } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Client {
  id: number;
  name: string;
  joinedQueue: string;
  waitTime: number;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: '', joinedQueue: '' });
  const [waitTimeFilter, setWaitTimeFilter] = useState<string>('all');

  useEffect(() => {
    async function fetchClients() {
      const response = await getClients();
      setClients(response.data);
      setFilteredClients(response.data);
    }
    fetchClients();
  }, []);

  // Filtra los clientes por tiempo de espera usando el waitTime proporcionado por el servicio
  useEffect(() => {
    if (waitTimeFilter === 'all') {
      setFilteredClients(clients);
      return;
    }
    
    const filtered = clients.filter(client => {
      switch (waitTimeFilter) {
        case 'lessThan5':
          return client.waitTime < 5;
        case '5to15':
          return client.waitTime >= 5 && client.waitTime <= 15;
        case 'moreThan15':
          return client.waitTime > 15;
        default:
          return true;
      }
    });
    
    setFilteredClients(filtered);
  }, [waitTimeFilter, clients]);

  const handleAddClient = async () => {
    const response = await addClient(newClient);
    setClients([...clients, response.data]);
    setNewClient({ name: '', joinedQueue: '' });
  };

  const formatDate = (dateString: string): string => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-4">Clientes</h1>

        <div className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">Filtrar por tiempo de espera</h5>
          </div>
          <div className="card-body">
            <div className="d-flex gap-2">
              <button 
                className={`btn ${waitTimeFilter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setWaitTimeFilter('all')}
              >
                Todos
              </button>
              <button 
                className={`btn ${waitTimeFilter === 'lessThan5' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setWaitTimeFilter('lessThan5')}
              >
                &lt; 5 min
              </button>
              <button 
                className={`btn ${waitTimeFilter === '5to15' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setWaitTimeFilter('5to15')}
              >
                5-15 min
              </button>
              <button 
                className={`btn ${waitTimeFilter === 'moreThan15' ? 'btn-primary' : 'btn-outline-primary'}`}
                onClick={() => setWaitTimeFilter('moreThan15')}
              >
                &gt; 15 min
              </button>
            </div>
          </div>
        </div>
        
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="mb-0">Lista de Clientes</h5>
          </div>
          <ul className="list-group list-group-flush">
            {filteredClients.map(client => {
              let badgeClass = "bg-success";
              
              if (client.waitTime > 15) {
                badgeClass = "bg-danger";
              } else if (client.waitTime > 5) {
                badgeClass = "bg-warning";
              }
              
              return (
                <li key={client.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <span>{client.name}</span>
                  <div>
                    <span className="text-muted me-2">Desde: {formatDate(client.joinedQueue)}</span>
                    <span className={`badge ${badgeClass}`}>
                      {client.waitTime} minutos
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        
        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Agregar Cliente</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="clientName" className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                id="clientName"
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Nombre del cliente"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="joinDate" className="form-label">Fecha de Ingreso</label>
              <input
                type="date"
                className="form-control"
                id="joinDate"
                value={newClient.joinedQueue.split('T')[0]}
                onChange={(e) => setNewClient({ ...newClient, joinedQueue: e.target.value })}
              />
            </div>
            <button 
              onClick={handleAddClient} 
              className="btn btn-primary"
            >
              Agregar Cliente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;