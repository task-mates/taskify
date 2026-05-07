import axios, { AxiosError, AxiosInstance } from 'axios';
import {
  getAccessToken,
  removeAccessToken,
} from '@/src/utils/authTokenStorage';
import { showToast } from '@/src/utils/toast';

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    _skipErrorToast?: boolean;
  }
}

const API_ERROR_MESSAGES = {
  network: '네트워크 연결을 확인해주세요.',
  server: '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
  forbidden: '접근 권한이 없습니다.',
  notFound: '요청한 정보를 찾을 수 없습니다.',
  unknown: '알 수 없는 오류가 발생했습니다.',
} as const;

function extractServerMessage(error: AxiosError): string | null {
  const data = error.response?.data;
  if (typeof data === 'object' && data !== null && 'message' in data) {
    return String((data as { message: unknown }).message);
  }
  return null;
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000,
});

instance.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (!axios.isAxiosError(error)) {
      showToast.error(API_ERROR_MESSAGES.unknown);
      return Promise.reject(error);
    }

    if (error.config?._skipErrorToast) {
      return Promise.reject(error);
    }

    if (error.code === 'ECONNABORTED' || !error.response) {
      showToast.error(API_ERROR_MESSAGES.network);
      return Promise.reject(error);
    }

    const { status } = error.response;

    if (status === 401) {
      const token = getAccessToken();
      if (token) {
        removeAccessToken();
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
      }
      return Promise.reject(error);
    }

    const serverMessage = extractServerMessage(error);

    if (status === 403) {
      showToast.error(serverMessage ?? API_ERROR_MESSAGES.forbidden);
    } else if (status === 404) {
      showToast.error(serverMessage ?? API_ERROR_MESSAGES.notFound);
    } else if (status >= 400 && status < 500) {
      showToast.error(serverMessage ?? API_ERROR_MESSAGES.unknown);
    } else if (status >= 500) {
      showToast.error(API_ERROR_MESSAGES.server);
    }

    return Promise.reject(error);
  }
);

export default instance;
