import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCurrentUser = () => api.get('/auth/user');
export const logout = () => api.get('/auth/logout');
export const getOrders = () => api.get('/orders');
export const updateOrderStatus = (id, status) => api.patch(`/orders/${id}/status`, { status });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);
export const getComments = () => api.get('/comments');
export const triggerMockWebhook = (productCode) => api.post('/webhook/facebook', { isMock: true, message: productCode });

export default api;
