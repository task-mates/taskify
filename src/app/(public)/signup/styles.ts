import styled from "styled-components";
import { DEVICE } from "@/src/styles/Breakpoints";
import Link from "next/link";

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
    max-width: 360px;
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

export const SignupForm = styled.form`
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

export const TermsLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  font-size: 14px;
  color: #4b4b4b;
  cursor: pointer;
`;

export const TermsCheckbox = styled.input`
  appearance: none;
  width: 16px;
  height: 16px;
  display: grid;
  place-content: center;
  border: 1px solidrgb(180, 181, 181);
  border-radius: 999px;
  background-color: rgb(180, 181, 181);
  cursor: pointer;

  &::before {
    content: '';
    width: 7px;
    height: 4px;
    border-left: 2px solid #ffffff;
    border-bottom: 2px solid #ffffff;
    transform: rotate(-45deg) scale(0);
    transform-origin: center;
    transition: transform 0.12s ease-in-out;
    margin-top: -1px;
  }

  &:checked {
    border-color: #83c6e5;
    background-color: #83c6e5;
  }

  &:checked::before {
    transform: rotate(-45deg) scale(1);
  }
`;

export const TermsText = styled.span`
  font-size: 14px;
  color: #4b4b4b;
`;

export const TermsLink = styled(Link)`
  color: #4b4b4b;
  font-weight: 700;
  text-decoration: underline;
`;

export const ErrorText = styled.p`
  min-height: 18px;
  margin: 0;
  color: #e5484d;
  font-size: 13px;
`;

export const SignupButton = styled.button`
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
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const LoginRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

export const HelperText = styled.p`
  font-size: 14px;
  color: #667085;
`;

export const LoginLink = styled(Link)`
  color: #4b4b4b;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
`;

export const ModalCard = styled.div`
  width: min(360px, calc(100vw - 32px));
  padding: 24px 20px;
  border-radius: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const ModalTitle = styled.p`
  color: #303030;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
`;

export const ModalButton = styled.button`
  min-width: 96px;
  height: 40px;
  padding: 0 20px;
  border: 0;
  border-radius: 8px;
  background: #83c6e5;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
`;
