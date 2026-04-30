'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';
import { useLoginForm } from '@/src/hooks/useLoginForm';
import { useLoginSubmit } from '@/src/hooks/useLoginSubmit';
import * as S from './styles';

export default function LoginPage() {
  const {
    email,
    password,
    errors,
    isPasswordVisible,
    setIsPasswordVisible,
    setErrors,
    setCommonError,
    handleEmailChange,
    handlePasswordChange,
    handleEmailBlur,
    handlePasswordBlur,
    validate,
  } = useLoginForm();
  const { isLoading, submitLogin } = useLoginSubmit();
  const isLoginButtonDisabled =
    isLoading || email.trim().length === 0 || password.trim().length === 0;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submitLogin({
      email,
      password,
      validate,
      setErrors,
      setCommonError,
    });
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

        <S.LoginForm onSubmit={handleSubmit}>
          <S.Label htmlFor='email'>이메일</S.Label>
          {/* 인풋 공통 컴포넌트 사용 예정 */}
          <S.TextInput
            id='email'
            type='email'
            $hasError={Boolean(errors.email)}
            value={email}
            onChange={(e) => handleEmailChange(e.target.value)}
            onBlur={handleEmailBlur}
            placeholder='이메일을 입력해주세요'
          />
          <S.ErrorText>{errors.email || ' '}</S.ErrorText>

          <S.Label htmlFor='password'>비밀번호</S.Label>
          <S.PasswordField>
            {/* 인풋 공통 컴포넌트 사용 예정 */}
            <S.PasswordInput
              id='password'
              type={isPasswordVisible ? 'text' : 'password'}
              $hasError={Boolean(errors.password)}
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              onBlur={handlePasswordBlur}
              placeholder='비밀번호를 입력해주세요'
            />
            {/* 눈 아이콘 클릭 시 비밀번호 보기/숨기기 */}
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
          <S.ErrorText>{errors.password || ' '}</S.ErrorText>

          {errors.common && <S.ErrorText>{errors.common}</S.ErrorText>}

          {/* 버튼 공통 컴포넌트 사용 예정 */}
          <S.LoginButton type='submit' disabled={isLoginButtonDisabled}>
            {isLoading ? '로그인 중' : '로그인'}
          </S.LoginButton>
        </S.LoginForm>

        <S.SignupRow>
          <S.HelperText>아직 회원이 아니신가요?</S.HelperText>
          <S.SignupLink href='/signup'>회원가입하기</S.SignupLink>
        </S.SignupRow>
      </S.FormSection>
    </S.Container>
  );
}
