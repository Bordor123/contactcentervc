import { useState, useEffect } from 'react';
import { getClients, addClient } from '../services/api';

interface Client {
  id: number;
  name: string;
  joinedQueue: string;
}

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClient, setNewClient] = useState({ name: '', joinedQueue: '' });

  useEffect(() => {
    async function fetchClients() {
      const response = await getClients();
      setClients(response.data);
    }
    fetchClients();
  }, []);

  const handleAddClient = async () => {
    const response = await addClient(newClient);
    setClients([...clients, response.data]);
    setNewClient({ name: '', joinedQueue: '' });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Clientes</h1>
      <ul style={styles.list}>
        {clients.map(client => (
          <li key={client.id} style={styles.listItem}>
            {client.name} - {client.joinedQueue}
          </li>
        ))}
      </ul>
      <div>
        <h2 style={styles.subHeader}>Agregar Cliente</h2>
        <input
          type="text"
          value={newClient.name}
          onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
          placeholder="Nombre"
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={newClient.joinedQueue}
          onChange={(e) => setNewClient({ ...newClient, joinedQueue: e.target.value })}
          style={styles.input}
        />
        <button onClick={handleAddClient} style={styles.button}>Agregar</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    fontSize: '2em',
    marginBottom: '20px',
  },
  subHeader: {
    fontSize: '1.5em',
    marginBottom: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    marginBottom: '10px',
  },
  input: {
    display: 'block',
    marginBottom: '10px',
    padding: '5px',
  },
  button: {
    marginLeft: '10px',
  },
};

export default Clients;