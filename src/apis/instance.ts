import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcwNSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NjkzMDcxNCwiaXNzIjoic3AtdGFza2lmeSJ9.cK0Rkx_SqTi1n3AOMmWJrM36iALksewgDA82z0QFCsg`,
  },
});

// instance.interceptors.request.use();
// instance.interceptors.response.use();

export default instance;
