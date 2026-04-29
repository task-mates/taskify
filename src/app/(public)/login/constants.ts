import { AUTH_VALIDATION_MESSAGES } from '@/src/utils/authValidation';

export const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: AUTH_VALIDATION_MESSAGES.emailInvalid,
  passwordRequired: '비밀번호를 입력해 주세요.',
  passwordInvalid: AUTH_VALIDATION_MESSAGES.passwordInvalid,
  loginFailed: '이메일 또는 비밀번호를 확인해 주세요.',
  userNotFound: '가입된 이메일이 아닙니다.',
  network: '네트워크 오류가 발생했어요.',
  temporary: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
  unknown: '알 수 없는 오류가 발생했어요.',
} as const;
