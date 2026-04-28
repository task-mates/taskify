const ACCESS_TOKEN_KEY = 'taskify:accessToken';
const LEGACY_ACCESS_TOKEN_KEY = 'accessToken';

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const currentToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (currentToken) {
    return currentToken;
  }

  const legacyToken = localStorage.getItem(LEGACY_ACCESS_TOKEN_KEY);
  if (legacyToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, legacyToken);
    localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
  }

  return legacyToken;
};

export const setAccessToken = (accessToken: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

export const removeAccessToken = () => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(LEGACY_ACCESS_TOKEN_KEY);
};
