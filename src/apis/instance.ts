import axios, { AxiosInstance } from 'axios';
import { getAccessToken } from '@/src/utils/authTokenStorage';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcwNSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NzQyNjM0MywiaXNzIjoic3AtdGFza2lmeSJ9.6CRZmL1iPf_aEChAKcoHTAdeK-b0d-37H6lt54y9Cms`,
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
