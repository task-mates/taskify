'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import Modal from '@/src/components/Modal';
import * as S from './styles';
import type { ModalType } from './type';
import { MODAL_MESSAGES } from './constants';
import { useSignupForm } from '@/src/hooks/useSignupForm';
import { useSignupSubmit } from '@/src/hooks/useSignupSubmit';

export default function SignupPage() {
  const router = useRouter();
  const [modalType, setModalType] = useState<ModalType>(null);
  const { isSubmitting, submitSignup } = useSignupSubmit();
  const {
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
    updateField,
    touchField,
    setIsTermsChecked,
    setHasEmailDuplicateError,
    setHasPasswordMismatchError,
    setIsPasswordVisible,
    setIsPasswordCheckVisible,
    markAllTouched,
    saveDraft,
  } = useSignupForm();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submitSignup({
      email,
      name,
      password,
      isFormComplete,
      isPasswordMatch,
      markAllTouched,
      setHasEmailDuplicateError,
      setHasPasswordMismatchError,
      setModalType,
    });
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
        <Link href='/' aria-label='메인 페이지 이동'>
          <S.LogoWrapper>
            <Image
              src='/images/icon-logo.svg'
              alt='Taskify 로고'
              fill
              priority
            />
          </S.LogoWrapper>
        </Link>

        <S.SignupForm onSubmit={handleSubmit}>
          <S.Label htmlFor='email'>이메일</S.Label>
          <S.TextInput
            id='email'
            type='email'
            $hasError={Boolean(emailErrorMessage)}
            value={email}
            onChange={(e) => {
              updateField('email', e.target.value);
              if (hasEmailDuplicateError) {
                setHasEmailDuplicateError(false);
              }
            }}
            onBlur={() => touchField('email')}
            placeholder='이메일을 입력해주세요'
          />
          <S.ErrorText>{emailErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor='name'>이름</S.Label>
          <S.TextInput
            id='name'
            type='text'
            $hasError={Boolean(nameErrorMessage)}
            value={name}
            onChange={(e) => updateField('name', e.target.value)}
            onBlur={() => touchField('name')}
            placeholder='이름을 입력해주세요'
          />
          <S.ErrorText>{nameErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor='password'>비밀번호</S.Label>
          <S.PasswordField>
            <S.PasswordInput
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              $hasError={Boolean(passwordErrorMessage)}
              value={password}
              onChange={(e) => {
                const nextPassword = e.target.value;
                updateField('password', nextPassword);
                if (hasPasswordMismatchError) {
                  setHasPasswordMismatchError(nextPassword !== passwordCheck);
                }
              }}
              onBlur={() => {
                touchField('password');
                if (passwordCheck.length > 0) {
                  setHasPasswordMismatchError(password !== passwordCheck);
                }
              }}
              placeholder='비밀번호를 입력해주세요'
            />
            <S.TogglePasswordButton
              type='button'
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
                alt=''
                width={20}
                height={20}
              />
            </S.TogglePasswordButton>
          </S.PasswordField>
          <S.ErrorText>{passwordErrorMessage || ' '}</S.ErrorText>

          <S.Label htmlFor='passwordCheck'>비밀번호 확인</S.Label>
          <S.PasswordField>
            <S.PasswordInput
              id='passwordCheck'
              type={isPasswordCheckVisible ? 'text' : 'password'}
              $hasError={Boolean(passwordCheckErrorMessage)}
              value={passwordCheck}
              onChange={(e) => {
                const nextPasswordCheck = e.target.value;
                updateField('passwordCheck', nextPasswordCheck);
                if (hasPasswordMismatchError) {
                  setHasPasswordMismatchError(password !== nextPasswordCheck);
                }
              }}
              onBlur={() => {
                touchField('passwordCheck');
                if (password.length > 0 && passwordCheck.length > 0) {
                  setHasPasswordMismatchError(password !== passwordCheck);
                }
              }}
              placeholder='비밀번호를 다시 입력해주세요'
            />
            <S.TogglePasswordButton
              type='button'
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
                alt=''
                width={20}
                height={20}
              />
            </S.TogglePasswordButton>
          </S.PasswordField>
          <S.ErrorText>{passwordCheckErrorMessage || ' '}</S.ErrorText>

          <S.TermsLabel htmlFor='terms'>
            <S.TermsCheckbox
              id='terms'
              type='checkbox'
              checked={isTermsChecked}
              onChange={(e) => setIsTermsChecked(e.target.checked)}
            />
            <S.TermsText>
              <S.TermsLink href='/terms?from=signup' onClick={saveDraft}>
                이용약관
              </S.TermsLink>
              에
              동의합니다
            </S.TermsText>
          </S.TermsLabel>

          <S.SignupButton
            type='submit'
            disabled={isSubmitting || !isFormComplete}
          >
            {isSubmitting ? '가입 중' : '회원가입'}
          </S.SignupButton>
        </S.SignupForm>

        <S.LoginRow>
          <S.HelperText>이미 회원이신가요?</S.HelperText>
          <S.LoginLink href='/login'>로그인하기</S.LoginLink>
        </S.LoginRow>
      </S.FormSection>

      {modalType && (
        <Modal onClose={() => setModalType(null)}>
          <S.ModalCard>
            <S.ModalTitle>
              {MODAL_MESSAGES[modalType]}
            </S.ModalTitle>
            <S.ModalButton onClick={handleModalConfirm}>확인</S.ModalButton>
          </S.ModalCard>
        </Modal>
      )}
    </S.Container>
  );
}
