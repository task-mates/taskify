import styled, { css } from 'styled-components';
import type { ButtonVariant } from './type';

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $width: string;
  $height: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 6px 30px;
  border-radius: 12px; 
  border: none;
  cursor: pointer;
  
  font: var(--lg-16px-semibold) "Pretendard", sans-serif;
  transition: all 0.2s ease-in-out;

  &:disabled {
    cursor: not-allowed;
    color: var(--color-gray-500);
    opacity: 0.6;
  }

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: var(--color-blue-100); 
      color: var(--color-white);
      &:hover:not(:disabled) { opacity: 0.8; }
      &:disabled { background-color: var(--color-gray-300); }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: var(--color-gray-500);
      color: var(--color-white);
      &:hover:not(:disabled) { opacity: 0.8; }
      &:disabled { background-color: var(--color-gray-300); }
    `}

  ${({ $variant }) =>
    $variant === 'ghost' &&
    css`
      background-color: transparent;
      color: var(--color-gray-400);
      &:hover:not(:disabled) {
        background-color: rgba(0, 0, 0, 0.05);
      }

      &:disabled { 
        background-color: transparent; 
      }
    `}
`;