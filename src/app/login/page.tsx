'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { postLogin } from '@/src/apis/auth';
import { useAuthToken } from '@/src/hooks/useAuthToken';
import * as S from './styles';
import Link from 'next/link';

type FormErrors = {
  email?: string;
  password?: string;
  common?: string;
};

export default function LoginPage() {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const router = useRouter();
  const { saveToken } = useAuthToken();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const emailErrorMessage = '이메일 형식이 올바르지 않아요.';
  const passwordErrorMessage = '비밀번호를 8자 이상 작성해 주세요.';
  const isValidEmail = (value: string) => emailRegex.test(value);
  const isValidPassword = (value: string) => value.length >= 8;

  const handleEmailBlur = () => {
    setEmailTouched(true);
    setErrors((prev) => ({
      ...prev,
      email: isValidEmail(email) ? undefined : emailErrorMessage,
    }));
  };

  const handlePasswordBlur = () => {
    setPasswordTouched(true);
    setErrors((prev) => ({
      ...prev,
      password: isValidPassword(password) ? undefined : passwordErrorMessage,
    }));
  };

  // 이메일 및 비밀번호 형식 정규식 검사
  const validate = () => {
    const nextErrors: FormErrors = {};

    if (!isValidEmail(email)) {
      nextErrors.email = emailErrorMessage;
    }

    if (!isValidPassword(password)) {
      nextErrors.password = passwordErrorMessage;
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
      saveToken(data.accessToken);

      router.push('/mydashboard');
    } catch {
      setErrors({ common: '네트워크 오류가 발생했어요.' });
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
          <S.Label htmlFor="email">아이디</S.Label>
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
                    : emailErrorMessage,
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
                      : passwordErrorMessage,
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
          <S.LoginButton type="submit" disabled={isLoading}>
            {isLoading ? '로그인 중' : '로그인'}
          </S.LoginButton>
        </S.LoginForm>

        <S.SignupRow>
          <S.HelperText>아직 회원이 아니신가요?</S.HelperText>
          <S.SignupLink type="button" onClick={() => router.push('/signup')}>
            회원가입
          </S.SignupLink>
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
