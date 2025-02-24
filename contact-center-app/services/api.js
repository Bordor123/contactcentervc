import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAgents = async () => {
  return axios.get(`${apiUrl}/agents`);
};

export const updateAgentStatus = async (id, status) => {
  return axios.put(`${apiUrl}/agents/${id}/status`, { status });
};

export const getClients = async () => {
  return axios.get(`${apiUrl}/clients`);
};

export const addClient = async (client) => {
  return axios.post(`${apiUrl}/clients`, client);
};
