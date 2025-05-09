import axios from 'axios';
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  
export const loginUser = (data) => API.post('/auth/login', data);
export const fetchPermissions = () => API.get('/permissions');
export const fetchRoles = () => API.get('/roles');
export const fetchUsers = () => API.get('/users');
export const createPermission = (data) => API.post('/permissions', data);
export const createRole = (data) => API.post('/roles', data);
export const createUser = (data) => API.post('/users', data);
