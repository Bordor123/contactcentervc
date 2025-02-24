const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchClients = async (minWaitTime) => {
  const response = await fetch(`${API_BASE_URL}/clients?minWaitTime=${minWaitTime || ''}`);
  return response.json();
};

export const addClient = async (client) => {
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(client)
  });
  return response.json();
};
