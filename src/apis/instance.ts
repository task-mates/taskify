import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjY5OSwidGVhbUlkIjoiMjMtNCIsImlhdCI6MTc3NjkwNzQ3OCwiaXNzIjoic3AtdGFza2lmeSJ9.GuteqVl659UhQ566tOM_ljs_mvtc0c2f-jsE2HzaFLY`,
  },
});

// instance.interceptors.request.use();
// instance.interceptors.response.use();

export default instance;
