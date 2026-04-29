import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@/src/utils/authTokenStorage';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcwNSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NzM0MzUxMywiaXNzIjoic3AtdGFza2lmeSJ9.Cz6KjIR-CN5cbKIgGz2B8Fg-UnvSc72ZZKPjOuM_NJY`,
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
