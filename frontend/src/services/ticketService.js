import api from './api';

export const createTicket = async (ticketData) => {
  const response = await api.post('/tickets', ticketData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getTickets = async (filters = {}) => {
  const response = await api.get('/tickets', { params: filters });
  return response.data;
};

export const getTicketById = async (id) => {
  const response = await api.get(`/tickets/${id}`);
  return response.data;
};

export const addComment = async (ticketId, content) => {
  const response = await api.post(`/tickets/${ticketId}/comments`, { content });
  return response.data;
};

export const voteTicket = async (ticketId, voteType) => {
  const response = await api.post(`/tickets/${ticketId}/vote`, { voteType });
  return response.data;
};

export const getCategories = async () => {
  const response = await api.get('/categories');
  return response.data;
};

export const createCategory = async (name) => {
  const response = await api.post('/categories', { name });
  return response.data;
};