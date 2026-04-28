'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import axios from 'axios';
import { postLogin } from '@/src/apis/auth';
import { setAccessToken } from '@/src/utils/authTokenStorage';
import * as S from './styles';
import Link from 'next/link';

type FormErrors = {
  email?: string;
  password?: string;
  common?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD_LENGTH = 8;
const ERROR_MESSAGES = {
  email: '이메일 형식이 올바르지 않아요.',
  password: `비밀번호를 ${MIN_PASSWORD_LENGTH}자 이상 작성해 주세요.`,
  loginFailed: '이메일 또는 비밀번호를 확인해 주세요.',
  userNotFound: '가입된 이메일이 아닙니다.',
  network: '네트워크 오류가 발생했어요.',
  temporary: '일시적인 오류가 발생했어요. 잠시 후 다시 시도해 주세요.',
  unknown: '알 수 없는 오류가 발생했어요.',
} as const;

const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
const isValidPassword = (value: string) => value.length >= MIN_PASSWORD_LENGTH;

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const isLoginButtonDisabled =
    isLoading || email.trim().length === 0 || password.trim().length === 0;

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setErrors((prev) => ({
      ...prev,
      email: isValidEmail(email) ? undefined : ERROR_MESSAGES.email,
    }));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setErrors((prev) => ({
      ...prev,
      password: isValidPassword(password) ? undefined : ERROR_MESSAGES.password,
    }));
  };

  // 이메일 및 비밀번호 형식 정규식 검사
  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!isValidEmail(email)) {
      nextErrors.email = ERROR_MESSAGES.email;
    }

    if (!isValidPassword(password)) {
      nextErrors.password = ERROR_MESSAGES.password;
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    try {
      setIsLoading(true);

      const data = await postLogin({ email, password });
      setAccessToken(data.accessToken);

      router.push('/mydashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || !error.response) {
          setErrors({ common: ERROR_MESSAGES.network });
          return;
        }

        const status = error.response?.status;
        const errorMessage =
          typeof error.response?.data === 'object' &&
          error.response?.data !== null &&
          'message' in error.response.data &&
          typeof error.response.data.message === 'string'
            ? error.response.data.message
            : '';

        if (status === 404) {
          setErrors({
            email: ERROR_MESSAGES.userNotFound,
          });
          return;
        }

        if (status === 400 || status === 401 || status === 403) {
          setErrors({
            password: ERROR_MESSAGES.loginFailed,
          });
          return;
        }

        if (typeof status === 'number' && status >= 400 && status < 500) {
          setErrors({
            common: errorMessage || ERROR_MESSAGES.temporary,
          });
          return;
        }

        setErrors({
          common: ERROR_MESSAGES.temporary,
        });
        return;
      }

      setErrors({ common: ERROR_MESSAGES.unknown });
    } finally {
      setIsLoading(false);
    }
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

        <S.LoginForm onSubmit={handleSubmit}>
          <S.Label htmlFor="email">이메일</S.Label>
          {/* 인풋 공통 컴포넌트 사용 예정 */}
          <S.TextInput
            id="email"
            type="email"
            $hasError={Boolean(errors.email)}
            value={email}
            onChange={(e) => {
              const nextEmail = e.target.value;
              setEmail(nextEmail);

              if (emailTouched) {
                setErrors((prev) => ({
                  ...prev,
                  email: isValidEmail(nextEmail)
                    ? undefined
                    : ERROR_MESSAGES.email,
                }));
              }
            }}
            onBlur={handleEmailBlur}
            placeholder="이메일을 입력해주세요"
          />
          {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}

          <S.Label htmlFor="password">비밀번호</S.Label>
          <S.PasswordField>
            {/* 인풋 공통 컴포넌트 사용 예정 */}
            <S.PasswordInput
              id="password"
              type={isPasswordVisible ? 'text' : 'password'}
              $hasError={Boolean(errors.password)}
              value={password}
              onChange={(e) => {
                const nextPassword = e.target.value;
                setPassword(nextPassword);

                if (passwordTouched) {
                  setErrors((prev) => ({
                    ...prev,
                    password: isValidPassword(nextPassword)
                      ? undefined
                      : ERROR_MESSAGES.password,
                  }));
                }
              }}
              onBlur={handlePasswordBlur}
              placeholder="비밀번호를 입력해주세요"
            />
            {/* 눈 아이콘 클릭 시 비밀번호 보기/숨기기 */}
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
          {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}

          {errors.common && <S.ErrorText>{errors.common}</S.ErrorText>}

          {/* 버튼 공통 컴포넌트 사용 예정 */}
          <S.LoginButton type="submit" disabled={isLoginButtonDisabled}>
            {isLoading ? '로그인 중' : '로그인'}
          </S.LoginButton>
        </S.LoginForm>

        <S.SignupRow>
          <S.HelperText>아직 회원이 아니신가요?</S.HelperText>
          <S.SignupLink href="/signup">회원가입하기</S.SignupLink>
        </S.SignupRow>
      </S.FormSection>

      <S.DesktopImageWrapper>
        <Image
          src="/images/login-pc-img.png"
          alt="Taskify 미리보기 이미지"
          fill
          priority
        />
      </S.DesktopImageWrapper>
    </S.Container>
  );
}
