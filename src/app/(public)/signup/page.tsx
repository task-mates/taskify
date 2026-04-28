'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Modal from '@/src/components/Modal';
import { usersApi } from '@/src/apis/users';
import {
  AUTH_VALIDATION_MESSAGES,
  isValidEmail,
  isValidPassword,
} from '@/src/utils/authValidation';
import * as S from './styles';
import type { ModalType, SignupDraft } from './type';
// 회원가입 입력값 임시저장을 위한 키
const SIGNUP_DRAFT_KEY = 'taskify-signup-draft';
const ERROR_MESSAGES = {
  emailRequired: '이메일을 입력해 주세요.',
  emailInvalid: AUTH_VALIDATION_MESSAGES.emailInvalid,
  emailDuplicate: '이미 사용중인 이메일입니다.',
  nameRequired: '이름을 입력해 주세요.',
  passwordRequired: '비밀번호를 입력해 주세요.',
  passwordInvalid: AUTH_VALIDATION_MESSAGES.passwordInvalid,
  passwordCheckRequired: '비밀번호 확인을 입력해 주세요.',
  passwordMismatch: '비밀번호가 일치하지 않습니다.',
} as const;

const DUPLICATE_EMAIL_ERROR_CODES = ['DUPLICATE_EMAIL', 'EMAIL_ALREADY_EXISTS'];

const isDuplicateEmailError = (
  status?: number,
  errorCode?: string
) => {
  return (
    status === 409 ||
    (typeof errorCode === 'string' &&
      DUPLICATE_EMAIL_ERROR_CODES.includes(errorCode))
  );
};

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isPasswordCheckVisible, setIsPasswordCheckVisible] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [passwordCheckTouched, setPasswordCheckTouched] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasEmailDuplicateError, setHasEmailDuplicateError] = useState(false);
  const [hasPasswordMismatchError, setHasPasswordMismatchError] =
    useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const isPasswordMatch = password === passwordCheck;
  const hasEmailRequiredError = emailTouched && email.trim().length === 0;
  const hasEmailFormatError =
    emailTouched && email.trim().length > 0 && !isValidEmail(email);
  const hasNameRequiredError = nameTouched && name.trim().length === 0;
  const hasPasswordRequiredError = passwordTouched && password.length === 0;
  const hasPasswordFormatError =
    passwordTouched && password.length > 0 && !isValidPassword(password);
  const hasPasswordCheckRequiredError =
    passwordCheckTouched && passwordCheck.length === 0;
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

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SIGNUP_DRAFT_KEY);
      if (!raw) {
        return;
      }

      const draft = JSON.parse(raw) as Partial<SignupDraft>;
      setEmail(draft.email ?? '');
      setName(draft.name ?? '');
      setIsTermsChecked(Boolean(draft.isTermsChecked));
    } catch {
      sessionStorage.removeItem(SIGNUP_DRAFT_KEY);
    }
  }, []);

  const saveDraft = () => {
    const draft: SignupDraft = {
      email,
      name,
      isTermsChecked,
    };
    sessionStorage.setItem(SIGNUP_DRAFT_KEY, JSON.stringify(draft));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmailTouched(true);
    setNameTouched(true);
    setPasswordTouched(true);
    setPasswordCheckTouched(true);

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

  const handleModalConfirm = () => {
    if (modalType === 'success') {
      router.push('/login');
      return;
    }

    setModalType(null);
  };

  return (
    <S.Container>
      <S.FormSection>
        <Link href="/" aria-label="메인 페이지 이동">
          <S.LogoWrapper>
            <Image
              src="/images/icon-logo.svg"
              alt="Taskify 로고"
              fill
              priority
            />
          </S.LogoWrapper>
        </Link>

        <S.SignupForm onSubmit={handleSubmit}>
          <S.Label htmlFor="email">이메일</S.Label>
          <S.TextInput
            id="email"
            type="email"
            $hasError={Boolean(emailErrorMessage)}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (hasEmailDuplicateError) {
                setHasEmailDuplicateError(false);
              }
            }}
            onBlur={() => setEmailTouched(true)}
            placeholder="이메일을 입력해주세요"
          />
          <S.ErrorText>{emailErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor="name">이름</S.Label>
          <S.TextInput
            id="name"
            type="text"
            $hasError={Boolean(nameErrorMessage)}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => setNameTouched(true)}
            placeholder="이름을 입력해주세요"
          />
          <S.ErrorText>{nameErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor="password">비밀번호</S.Label>
          <S.PasswordField>
            <S.PasswordInput
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              $hasError={Boolean(passwordErrorMessage)}
              value={password}
              onChange={(e) => {
                const nextPassword = e.target.value;
                setPassword(nextPassword);
                if (hasPasswordMismatchError) {
                  setHasPasswordMismatchError(nextPassword !== passwordCheck);
                }
              }}
              onBlur={() => {
                setPasswordTouched(true);
                if (passwordCheck.length > 0) {
                  setHasPasswordMismatchError(password !== passwordCheck);
                }
              }}
              placeholder="비밀번호를 입력해주세요"
            />
            <S.TogglePasswordButton
              type="button"
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              aria-label={
                isPasswordVisible ? '비밀번호 숨기기' : '비밀번호 보기'
              }
            >
              <Image
                src={
                  isPasswordVisible
                    ? '/images/password-eye-on.svg'
                    : '/images/password-eye-off.svg'
                }
                alt=""
                width={20}
                height={20}
              />
            </S.TogglePasswordButton>
          </S.PasswordField>
          <S.ErrorText>{passwordErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor="passwordCheck">비밀번호 확인</S.Label>
          <S.PasswordField>
            <S.PasswordInput
              id="passwordCheck"
              type={isPasswordCheckVisible ? 'text' : 'password'}
              $hasError={Boolean(passwordCheckErrorMessage)}
              value={passwordCheck}
              onChange={(e) => {
                const nextPasswordCheck = e.target.value;
                setPasswordCheck(nextPasswordCheck);
                if (hasPasswordMismatchError) {
                  setHasPasswordMismatchError(password !== nextPasswordCheck);
                }
              }}
              onBlur={() => {
                setPasswordCheckTouched(true);
                if (password.length > 0 && passwordCheck.length > 0) {
                  setHasPasswordMismatchError(password !== passwordCheck);
                }
              }}
              placeholder="비밀번호를 다시 입력해주세요"
            />
            <S.TogglePasswordButton
              type="button"
              onClick={() => setIsPasswordCheckVisible((prev) => !prev)}
              aria-label={
                isPasswordCheckVisible
                  ? '비밀번호 확인 숨기기'
                  : '비밀번호 확인 보기'
              }
            >
              <Image
                src={
                  isPasswordCheckVisible
                    ? '/images/password-eye-on.svg'
                    : '/images/password-eye-off.svg'
                }
                alt=""
                width={20}
                height={20}
              />
            </S.TogglePasswordButton>
          </S.PasswordField>
          <S.ErrorText>{passwordCheckErrorMessage || ' '}</S.ErrorText>

          <S.TermsLabel htmlFor="terms">
            <S.TermsCheckbox
              id="terms"
              type="checkbox"
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            <S.TermsText>
              <S.TermsLink href="/terms?from=signup" onClick={saveDraft}>
                이용약관
              </S.TermsLink>
              에
              동의합니다
            </S.TermsText>
          </S.TermsLabel>

          <S.SignupButton
            type="submit"
            disabled={isSubmitting || !isFormComplete}
          >
            {isSubmitting ? '가입 중' : '회원가입'}
          </S.SignupButton>
        </S.SignupForm>

        <S.LoginRow>
          <S.HelperText>이미 회원이신가요?</S.HelperText>
          <S.LoginLink href="/login">로그인하기</S.LoginLink>
        </S.LoginRow>
      </S.FormSection>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          <S.ModalCard>
            <S.ModalTitle>
              {modalType === 'success' && '가입이 완료되었습니다.'}
              {modalType === 'duplicate' && '이미 사용 중인 이메일입니다.'}
              {modalType === 'error' && '회원가입 중 오류가 발생했습니다.'}
            </S.ModalTitle>
            <S.ModalButton onClick={handleModalConfirm}>확인</S.ModalButton>
          </S.ModalCard>
        </Modal>
      )}
    </S.Container>
  );
}
