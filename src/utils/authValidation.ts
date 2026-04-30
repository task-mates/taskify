export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MIN_PASSWORD_LENGTH = 8;

export const AUTH_VALIDATION_MESSAGES = {
  emailInvalid: '이메일 형식이 올바르지 않아요.',
  passwordInvalid: `비밀번호를 ${MIN_PASSWORD_LENGTH}자 이상 작성해 주세요.`,
} as const;

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
export const isValidPassword = (value: string) =>
  value.length >= MIN_PASSWORD_LENGTH;
