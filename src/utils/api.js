import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-backend-url-on-render.com';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export default api;
