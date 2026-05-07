'use client';

import { forwardRef } from 'react';
import * as S from './style';
import type { InputProps } from './type';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ error, className, ...props }, ref) => (
    <S.Wrapper className={className}>
      <S.StyledInput ref={ref} $hasError={!!error} {...props} />
      <S.ErrorMessage $visible={!!error}>{error}</S.ErrorMessage>
    </S.Wrapper>
  )
);

Input.displayName = 'Input';

export default Input;
