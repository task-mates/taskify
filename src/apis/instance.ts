import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@/src/utils/authTokenStorage';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcwNSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NzUxNzYzNiwiaXNzIjoic3AtdGFza2lmeSJ9.au90L0GUcBo-N_DbzywrLb6eFrNTVlUA65xGdyItjAk`,
  },
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
