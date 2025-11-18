import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// helper to attach token
const withToken = (token) => ({ headers: { Authorization: `Bearer ${token}` } });

export const getTasks = (token) => API.get('/tasks', withToken(token));
export const createTask = (token, data) => API.post('/tasks', data, withToken(token));
export const updateTask = (token, id, data) => API.put(`/tasks/${id}`, data, withToken(token));
export const deleteTask = (token, id) => API.delete(`/tasks/${id}`, withToken(token));
