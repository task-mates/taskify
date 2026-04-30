import { useState } from 'react';
import { isValidEmail, isValidPassword } from '@/src/utils/authValidation';
import {
  ERROR_MESSAGES,
  SIGNUP_DRAFT_KEY,
} from '@/src/app/(public)/signup/constants';
import type { SignupDraft } from '@/src/app/(public)/signup/type';

type FieldState = {
  value: string;
  touched: boolean;
};

type FieldsState = {
  email: FieldState;
  name: FieldState;
  password: FieldState;
  passwordCheck: FieldState;
};

const EMPTY_DRAFT: SignupDraft = {
  email: '',
  name: '',
  isTermsChecked: false,
};

const getInitialDraft = (): SignupDraft => {
  if (typeof window === 'undefined') {
    return EMPTY_DRAFT;
  }

  try {
    const raw = window.sessionStorage.getItem(SIGNUP_DRAFT_KEY);
    if (!raw) {
      return EMPTY_DRAFT;
    }

    const draft = JSON.parse(raw) as Partial<SignupDraft>;
    return {
      email: draft.email ?? '',
      name: draft.name ?? '',
      isTermsChecked: Boolean(draft.isTermsChecked),
    };
  } catch {
    window.sessionStorage.removeItem(SIGNUP_DRAFT_KEY);
    return EMPTY_DRAFT;
  }
};

export function useSignupForm() {
  const initialDraft = getInitialDraft();
  const [fields, setFields] = useState<FieldsState>({
    email: { value: initialDraft.email, touched: false },
    name: { value: initialDraft.name, touched: false },
    password: { value: '', touched: false },
    passwordCheck: { value: '', touched: false },
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(initialDraft.isTermsChecked);
  const [hasEmailDuplicateError, setHasEmailDuplicateError] = useState(false);
  const [hasPasswordMismatchError, setHasPasswordMismatchError] = useState(false);

  const email = fields.email.value;
  const name = fields.name.value;
  const password = fields.password.value;
  const passwordCheck = fields.passwordCheck.value;

  const isPasswordMatch = password === passwordCheck;
  const hasEmailRequiredError = fields.email.touched && email.trim().length === 0;
  const hasEmailFormatError =
    fields.email.touched && email.trim().length > 0 && !isValidEmail(email);
  const hasNameRequiredError = fields.name.touched && name.trim().length === 0;
  const hasPasswordRequiredError = fields.password.touched && password.length === 0;
  const hasPasswordFormatError =
    fields.password.touched && password.length > 0 && !isValidPassword(password);
  const hasPasswordCheckRequiredError =
    fields.passwordCheck.touched && passwordCheck.length === 0;

  const emailErrorMessage = hasEmailDuplicateError
    ? ERROR_MESSAGES.emailDuplicate
    : hasEmailRequiredError
      ? ERROR_MESSAGES.emailRequired
      : hasEmailFormatError
        ? ERROR_MESSAGES.emailInvalid
        : '';
  const nameErrorMessage = hasNameRequiredError ? ERROR_MESSAGES.nameRequired : '';
  const passwordErrorMessage = hasPasswordRequiredError
    ? ERROR_MESSAGES.passwordRequired
    : hasPasswordFormatError
      ? ERROR_MESSAGES.passwordInvalid
      : '';
  const passwordCheckErrorMessage = hasPasswordCheckRequiredError
    ? ERROR_MESSAGES.passwordCheckRequired
    : hasPasswordMismatchError
      ? ERROR_MESSAGES.passwordMismatch
      : '';

  const isFormComplete =
    email.trim().length > 0 &&
    name.trim().length > 0 &&
    password.length > 0 &&
    passwordCheck.length > 0 &&
    isTermsChecked;

  const updateField = (field: keyof FieldsState, value: string) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        value,
        touched: true,
      },
    }));
  };

  const touchField = (field: keyof FieldsState) => {
    setFields((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        touched: true,
      },
    }));
  };

  const markAllTouched = () => {
    setFields((prev) => ({
      email: { ...prev.email, touched: true },
      name: { ...prev.name, touched: true },
      password: { ...prev.password, touched: true },
      passwordCheck: { ...prev.passwordCheck, touched: true },
    }));
  };

  const saveDraft = () => {
    const draft: SignupDraft = { email, name, isTermsChecked };
    window.sessionStorage.setItem(SIGNUP_DRAFT_KEY, JSON.stringify(draft));
  };

  return {
    email,
    name,
    password,
    passwordCheck,
    isPasswordVisible,
    isPasswordCheckVisible,
    isTermsChecked,
    hasEmailDuplicateError,
    hasPasswordMismatchError,
    emailErrorMessage,
    nameErrorMessage,
    passwordErrorMessage,
    passwordCheckErrorMessage,
    isFormComplete,
    isPasswordMatch,
    fields,
    updateField,
    touchField,
    setIsTermsChecked,
    setHasEmailDuplicateError,
    setHasPasswordMismatchError,
    setIsPasswordVisible,
    setIsPasswordCheckVisible,
    markAllTouched,
    saveDraft,
  };
}
