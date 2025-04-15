// api.js (frontend/src)
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001'; // Update this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,  // Assuming your authentication endpoints are under /auth
});

export default api;
