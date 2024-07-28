import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Substitua pelo URL do seu backend
});

export default api;
