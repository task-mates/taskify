import styled from "styled-components";
import { DEVICE } from "@/src/styles/Breakpoints";
import Link from "next/link";

// AppShell 분리 후 로그인 페이지 레이아웃 재조정 예정
export const Container = styled.main`
  width: 100%;
  max-width: 1440px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 72px 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(48px, 8vw, 120px);

  @media ${DEVICE.tablet} {
    padding: 80px 16px;
  }
`;

export const FormSection = styled.section`
  width: 100%;
  max-width: 372px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const LogoWrapper = styled.div`
  width: 230px;
  height: 60px;
  position: relative;
  margin: 0 auto;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 14px;
  color: #303030;
`;

export const TextInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid ${({ $hasError }) => ($hasError ? '#e5484d' : '#d0d5dd')};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) => ($hasError ? '#e5484d' : '#83c6e5')};
  }
`;

export const PasswordField = styled.div`
  position: relative;
`;

export const PasswordInput = styled(TextInput)`
  padding-right: 44px;
`;

export const TogglePasswordButton = styled.button`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  width: 100%;
  height: 44px;
  margin-top: 8px;
  border: 0;
  border-radius: 8px;
  background-color: #83c6e5;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export const ErrorText = styled.p`
  color: #e5484d;
  font-size: 13px;
`;

export const SignupRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const HelperText = styled.p`
  font-size: 14px;
  color: #667085;
`;

export const SignupLink = styled(Link)`
  color: #4b4b4b;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;

export const DesktopImageWrapper = styled.div`
  position: relative;
  width: clamp(520px, 52vw, 860px);
  aspect-ratio: 860 / 575;
  border-radius: 12px;
  overflow: hidden;

  @media ${DEVICE.tablet} {
    display: none;
  }
`;
