import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar el token JWT a cada request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Simulacion temporal de autenticacion (reemplazar con backend real)
const SIMULATED_DELAY = 800;

const simulatedUsers = [
  { id: 1, name: 'Usuario Demo', email: 'demo@authapp.com', password: 'demo123' },
];

function simulateRequest(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, SIMULATED_DELAY);
  });
}

export async function login(email, password) {
  // TODO: Reemplazar con llamada real al backend
  // return api.post('/auth/login', { email, password });

  const user = simulatedUsers.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error('Credenciales invalidas');
  }

  const token = 'simulated-jwt-token-' + Date.now();
  const userData = { id: user.id, name: user.name, email: user.email };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));

  return simulateRequest({ token, user: userData });
}

export async function register(name, email, password) {
  // TODO: Reemplazar con llamada real al backend
  // return api.post('/auth/register', { name, email, password });

  const exists = simulatedUsers.find((u) => u.email === email);
  if (exists) {
    throw new Error('El email ya esta registrado');
  }

  const newUser = { id: Date.now(), name, email, password };
  simulatedUsers.push(newUser);

  const token = 'simulated-jwt-token-' + Date.now();
  const userData = { id: newUser.id, name: newUser.name, email: newUser.email };

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(userData));

  return simulateRequest({ token, user: userData });
}

export async function logout() {
  // TODO: Reemplazar con llamada real al backend
  // return api.post('/auth/logout');

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return simulateRequest({ success: true });
}

export function getStoredUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function getStoredToken() {
  return localStorage.getItem('token');
}

export { api };
