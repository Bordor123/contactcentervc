import { useState, useEffect } from 'react';
import { getAgents, updateAgentStatus } from '../services/api';

interface Agent {
  id: number;
  name: string;
  status: number;
}

const Agents = () => {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    async function fetchAgents() {
      const response = await getAgents();
      setAgents(response.data);
    }
    fetchAgents();
  }, []);

  const handleStatusChange = async (id: number, status: number) => {
    await updateAgentStatus(id, status);
    const updatedAgents = agents.map(agent =>
      agent.id === id ? { ...agent, status } : agent
    );
    setAgents(updatedAgents);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Agentes</h1>
      <ul style={styles.list}>
        {agents.map(agent => (
          <li key={agent.id} style={styles.listItem}>
            {agent.name} - {agent.status}
            <button style={styles.button} onClick={() => handleStatusChange(agent.id, 1)}>Disponible</button>
            <button style={styles.button} onClick={() => handleStatusChange(agent.id, 2)}>En Llamada</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  button: {
    marginLeft: '10px',
  },
};

export default Agents;