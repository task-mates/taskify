import { useState } from 'react';
import axios from 'axios';
import { usersApi } from '@/src/apis/users';
import { SIGNUP_DRAFT_KEY } from '@/src/app/(public)/signup/constants';
import { isDuplicateEmailError } from '@/src/app/(public)/signup/utils';
import type { ModalType } from '@/src/app/(public)/signup/type';

type SignupSubmitParams = {
  email: string;
  name: string;
  password: string;
  isFormComplete: boolean;
  isPasswordMatch: boolean;
  markAllTouched: () => void;
  setHasEmailDuplicateError: (value: boolean) => void;
  setHasPasswordMismatchError: (value: boolean) => void;
  setModalType: (value: ModalType) => void;
};

export function useSignupSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitSignup = async ({
    email,
    name,
    password,
    isFormComplete,
    isPasswordMatch,
    markAllTouched,
    setHasEmailDuplicateError,
    setHasPasswordMismatchError,
    setModalType,
  }: SignupSubmitParams) => {
    markAllTouched();

    if (isSubmitting || !isFormComplete) {
      return;
    }

    if (!isPasswordMatch) {
      setHasPasswordMismatchError(true);
      return;
    }

    try {
      setIsSubmitting(true);
      setHasEmailDuplicateError(false);
      setHasPasswordMismatchError(false);
      await usersApi.signUp({
        email,
        nickname: name,
        password,
      });
      sessionStorage.removeItem(SIGNUP_DRAFT_KEY);
      setModalType('success');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorCode =
          typeof error.response?.data === 'object' &&
          error.response?.data !== null &&
          'code' in error.response.data &&
          typeof error.response.data.code === 'string'
            ? error.response.data.code
            : undefined;

        if (isDuplicateEmailError(status, errorCode)) {
          setHasEmailDuplicateError(true);
          setModalType('duplicate');
          return;
        }
      }

      setModalType('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, submitSignup };
}
