'use client';

import * as S from './style';
import type { ButtonProps } from './type';


export default function Button({
  children,
  variant = 'primary',
  leftIcon,
  onClick,
  type = 'button',
  width = '100%',
  height = '100%', 
  disabled = false,
  ...props
}: ButtonProps) {
  return (
    <S.StyledButton
      $variant={variant}
      $width={width}
      $height={height}
      onClick={onClick}
      type={type}
      disabled={disabled}
      {...props}
    >
      {leftIcon && <S.IconWrapper>{leftIcon}</S.IconWrapper>}
      {children}
    </S.StyledButton>
  );
}