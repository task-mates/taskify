import { AUTH_VALIDATION_MESSAGES } from '@/src/utils/authValidation';

// 회원가입 입력값 임시저장을 위한 키
export const SIGNUP_DRAFT_KEY = 'taskify-signup-draft';

export const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: AUTH_VALIDATION_MESSAGES.emailInvalid,
  emailDuplicate: '이미 사용중인 이메일입니다.',
  nameRequired: '이름을 입력해 주세요.',
  passwordRequired: '비밀번호를 입력해 주세요.',
  passwordInvalid: AUTH_VALIDATION_MESSAGES.passwordInvalid,
  passwordCheckRequired: '비밀번호 확인을 입력해 주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
} as const;

export const DUPLICATE_EMAIL_ERROR_CODES = [
  'DUPLICATE_EMAIL',
  'EMAIL_ALREADY_EXISTS',
] as const;

export const MODAL_MESSAGES = {
  success: '가입이 완료되었습니다.',
  duplicate: '이미 사용 중인 이메일입니다.',
  error: '회원가입 중 오류가 발생했습니다.',
} as const;
