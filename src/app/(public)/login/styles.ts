import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import Link from 'next/link';
import Button from '@/src/components/common/Button';

export const Container = styled.main`
  width: 100%;
  max-width: 372px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 72px 16px;
  display: flex;
  align-items: center;
  justify-content: center;

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
  color: var(--color-text-body);
`;

export const TextInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-gray-300)'};
  border-radius: 8px;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-blue-200)'};
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
  top: 0;
  right: 12px;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
`;

export const LoginButton = styled(Button).attrs({
  width: '100%',
  height: '44px',
})`
  margin-top: 8px;
  font-weight: 700;
`;

export const ErrorText = styled.p`
  min-height: 18px;
  margin: 0;
  color: var(--color-error);
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
  color: var(--color-gray-muted);
`;

export const SignupLink = styled(Link)`
  color: var(--color-black-100);
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;
