import { useCallback } from 'react';

const ACCESS_TOKEN_KEY = 'accessToken';

// 토큰 읽기
export const getAccessToken = (): string | null => {
  // SSR/브라우저 구분
  if (typeof window === 'undefined') {
    return null;
  }
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

// 토큰 저장
export const setAccessToken = (accessToken: string) => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

// 토큰 삭제
export const removeAccessToken = () => {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

export const useAuthToken = () => {
  const saveToken = useCallback((accessToken: string) => {
    setAccessToken(accessToken);
  }, []);

  const clearToken = useCallback(() => {
    removeAccessToken();
  }, []);

  return {
    getToken: getAccessToken,
    saveToken,
    clearToken,
  };
};
