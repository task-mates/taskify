import { ERROR_MESSAGES } from './constants';
import { isValidEmail, isValidPassword } from '@/src/utils/authValidation';

export const getEmailError = (email: string): string | undefined => {
  if (email.trim().length === 0) {
    return ERROR_MESSAGES.emailRequired;
  }

  return isValidEmail(email) ? undefined : ERROR_MESSAGES.emailInvalid;
};

export const getPasswordError = (password: string): string | undefined => {
  if (password.length === 0) {
    return ERROR_MESSAGES.passwordRequired;
  }

  return isValidPassword(password) ? undefined : ERROR_MESSAGES.passwordInvalid;
};
