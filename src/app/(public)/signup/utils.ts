import { DUPLICATE_EMAIL_ERROR_CODES } from './constants';

export const isDuplicateEmailError = (status?: number, errorCode?: string) => {
  return (
    status === 409 ||
    (typeof errorCode === 'string' &&
      DUPLICATE_EMAIL_ERROR_CODES.includes(
        errorCode as (typeof DUPLICATE_EMAIL_ERROR_CODES)[number]
      ))
  );
};
