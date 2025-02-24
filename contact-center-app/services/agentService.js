const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchAgents = async (status) => {
  const response = await fetch(`${API_BASE_URL}/agents?status=${status || ''}`);
  return response.json();
};

export const updateAgentStatus = async (id, newStatus) => {
  const response = await fetch(`${API_BASE_URL}/agents/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ status: newStatus })
  });
  return response.json();
};
