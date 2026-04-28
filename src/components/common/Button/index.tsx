'use client';

import styled, { css } from 'styled-components';
import type { ButtonProps, ButtonVariant } from './type';

export default function Button({
  children,
  variant = 'primary',
  leftIcon,
  onClick,
  type = 'button',
  width = '200px',
  height = '60px',
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $width={width}
      $height={height}
      onClick={onClick}
      type={type}
      {...props}
    >
      {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children}
    </StyledButton>
  );
}

const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $width: string;
  $height: string;
}>`

  display: flex;
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
  padding: 6px 30px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 14px;
  
  cursor: pointer;
  border: none;
  var(--lg-16px-semibold);

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: var(--color-brand-300);
      color: var(--color-white);
      &:hover { background-color: var(--color-brand-400); }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: var(--color-gray-400);
      color: var(--color-white);
      &:hover { background-color: var(--color-gray-500); }
    `}

  ${({ $variant }) =>
    $variant === 'ghost' &&
    css`
      background-color: transparent;
      color: var(--color-gray-400); 
      &:hover, &focus-visible { background-color: rgba(0, 0, 0, 0.05); }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;