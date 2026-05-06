'use client';

import { forwardRef } from 'react';
import * as S from './style';
import type { InputProps } from './type';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className, ...props }, ref) => {
    return (
      <S.InputWrapper className={className}>
        {label && <S.Label htmlFor={id}>{label}</S.Label>}
        
        <S.StyledInput
          id={id}
          ref={ref}
          $isError={!!error}
          {...props}
        />
        
        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}
      </S.InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;