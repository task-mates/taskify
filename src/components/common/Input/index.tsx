'use client';

import { forwardRef } from 'react';
import * as S from './style';
import type { InputProps } from './type';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <S.InputWrapper className={className}>
        {label && <S.Label htmlFor={id}>{label}</S.Label>}
        
        <S.InputContainer $isError={!!error}>
          {leftIcon && <S.IconWrapper $position="left">{leftIcon}</S.IconWrapper>}
          
          <S.StyledInput
            id={id}
            ref={ref}
            {...props}
          />

          {rightIcon && <S.IconWrapper $position="right">{rightIcon}</S.IconWrapper>}
        </S.InputContainer>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;