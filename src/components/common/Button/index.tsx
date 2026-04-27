'use client';

import { useRef } from 'react';
import styled, { css } from 'styled-components';
import type { ButtonProps, ButtonVariant } from './type';

export default function Button({
  children,
  variant = 'primary',
  leftIcon,
  onClick,
  $width = '200px',
  $height = '60px',
  ...props
}: ButtonProps) {
  
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickRef.current?.(e);
  };

  return (
    <StyledButton
      $variant={variant}
      $width={$width}
      $height={$height}
      onClick={handleClick}
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
  font-size: 16px;
  font-weight: 600;

  ${({ $variant }) =>
    $variant === 'primary' &&
    css`
      background-color: #83C6E5;
      color: #ffffff;
      &:hover { background-color: #6fb0cf; }
    `}

  ${({ $variant }) =>
    $variant === 'secondary' &&
    css`
      background-color: #888787;
      color: #ffffff;
      &:hover { background-color: #757474; }
    `}

  ${({ $variant }) =>
    $variant === 'ghost' &&
    css`
      background-color: transparent;
      color: #888787; 
      &:hover { background-color: rgba(0, 0, 0, 0.05); }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;