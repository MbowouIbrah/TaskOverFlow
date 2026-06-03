import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
console.log('API Base URL:', baseURL);

const apiClient = axios.create({
  baseURL: baseURL.endsWith('/api') ? baseURL : `${baseURL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});


// Intercepteur pour ajouter le token JWT à chaque requête
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('taskflow_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs globales (ex: session expirée)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('taskflow_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
