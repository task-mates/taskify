import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjcwNSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NzI1NTM4OCwiaXNzIjoic3AtdGFza2lmeSJ9.hSfgYXqOljSa8lKeAo5CT6sFvrgmwXqShQM5sFpWMQs`,
  },
});

// instance.interceptors.request.use();
// instance.interceptors.response.use();

export default instance;
