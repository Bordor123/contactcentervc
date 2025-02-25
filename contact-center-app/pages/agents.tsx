import { useState, useEffect } from 'react';
import { getAgents, updateAgentStatus } from '../services/api';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Agent {
  id: number;
  name: string;
  status: number;
  waitTime?: number;
}

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [filteredAgents, setFilteredAgents] = useState<Agent[]>([]);
  const [statusFilter, setStatusFilter] = useState<number | null>(null);

  useEffect(() => {
    async function fetchAgents() {
      const response = await getAgents();
      const agentsWithWaitTime = response.data.map((agent: Agent) => ({
        ...agent,
        waitTime: agent.waitTime || Math.floor(Math.random() * 60)
      }));
      setAgents(agentsWithWaitTime);
      setFilteredAgents(agentsWithWaitTime);
    }
    fetchAgents();
  }, []);

  useEffect(() => {
    if (statusFilter === null) {
      setFilteredAgents(agents);
    } else {
      setFilteredAgents(agents.filter(agent => agent.status === statusFilter));
    }
  }, [statusFilter, agents]);

  const handleStatusChange = async (id: number, status: number) => {
    await updateAgentStatus(id, status);
    const updatedAgents = agents.map(agent =>
      agent.id === id ? { ...agent, status } : agent
    );
    setAgents(updatedAgents);
  };

  const getStatusText = (status: number): string => {
    switch (status) {
      case 1: return 'Disponible';
      case 2: return 'En Llamada';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="w-100" style={{ maxWidth: '800px' }}>
        <h1 className="text-center mb-4">Agentes</h1>
        
        <div className="card mb-3">
          <div className="card-header">
            <h5 className="mb-0">Filtros</h5>
          </div>
          <div className="card-body">
            <div className="d-flex gap-2">
              <button 
                className={`btn ${statusFilter === null ? 'btn-primary' : 'btn-outline-primary'}`} 
                onClick={() => setStatusFilter(null)}
              >
                Todos
              </button>
              <button 
                className={`btn ${statusFilter === 1 ? 'btn-success' : 'btn-outline-success'}`} 
                onClick={() => setStatusFilter(1)}
              >
                Disponibles
              </button>
              <button 
                className={`btn ${statusFilter === 2 ? 'btn-warning' : 'btn-outline-warning'}`} 
                onClick={() => setStatusFilter(2)}
              >
                En Llamada
              </button>
            </div>
          </div>
        </div>
        
        <ul className="list-group p-0">
          {filteredAgents.map(agent => (
            <li key={agent.id} className="list-group-item d-flex justify-content-between align-items-center mb-2">
              <div>
                <div><strong>{agent.name}</strong></div>
                <div>
                  <span className={`badge ${agent.status === 1 ? 'bg-success' : 'bg-warning'} me-2`}>
                    {getStatusText(agent.status)}
                  </span>
                  <span className="text-muted">
                    Tiempo en espera: {agent.waitTime} min
                  </span>
                </div>
              </div>
              <div>
                <button 
                  className="btn btn-success btn-sm me-2" 
                  onClick={() => handleStatusChange(agent.id, 1)}
                  disabled={agent.status === 1}
                >
                  Disponible
                </button>
                <button 
                  className="btn btn-warning btn-sm" 
                  onClick={() => handleStatusChange(agent.id, 2)}
                  disabled={agent.status === 2}
                >
                  En Llamada
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Agents;