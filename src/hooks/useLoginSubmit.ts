import { useRouter } from 'next/navigation';
import { type Dispatch, type SetStateAction, useState } from 'react';
import axios from 'axios';
import { postLogin } from '@/src/apis/auth';
import { setAccessToken } from '@/src/utils/authTokenStorage';
import { ERROR_MESSAGES } from '@/src/app/(public)/login/constants';
import type { FormErrors } from './useLoginForm';

type LoginParams = {
  email: string;
  password: string;
  validate: () => boolean;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
  setCommonError: (message?: string) => void;
};

export function useLoginSubmit() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const submitLogin = async ({
    email,
    password,
    validate,
    setErrors,
    setCommonError,
  }: LoginParams) => {
    if (!validate()) {
      return;
    }

    try {
      setIsLoading(true);
      setCommonError(undefined);

      const data = await postLogin({ email, password });
      setAccessToken(data.accessToken);
      router.replace('/mydashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || !error.response) {
          setCommonError(ERROR_MESSAGES.network);
          return;
        }

        const status = error.response?.status;
        const errorMessage =
          typeof error.response?.data === 'object' &&
          error.response?.data !== null &&
          'message' in error.response.data &&
          typeof error.response.data.message === 'string'
            ? error.response.data.message
            : '';

        if (status === 404) {
          setErrors((prev) => ({ ...prev, email: ERROR_MESSAGES.userNotFound }));
          return;
        }

        if (status === 400 || status === 401 || status === 403) {
          setErrors((prev) => ({ ...prev, password: ERROR_MESSAGES.loginFailed }));
          return;
        }

        if (typeof status === 'number' && status >= 400 && status < 500) {
          setCommonError(errorMessage || ERROR_MESSAGES.temporary);
          return;
        }

        setCommonError(ERROR_MESSAGES.temporary);
        return;
      }

      setCommonError(ERROR_MESSAGES.unknown);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, submitLogin };
}
