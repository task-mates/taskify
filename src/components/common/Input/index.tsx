'use client';

import { forwardRef, useId } from 'react';
import * as S from './style';
import type { InputProps } from './type';

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, id, className, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id || generatedId;
    const errorId = `${inputId}-error`;

    return (
        <S.InputWrapper className={className}>
        {label && <S.Label htmlFor={inputId}>{label}</S.Label>}
        
        <S.StyledInput
            id={inputId}
            ref={ref}
            $isError={!!error}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            {...props}
        />
        
        {error && <S.ErrorMessage id={errorId} role="alert">{error}</S.ErrorMessage>}
        </S.InputWrapper>
    );
  }
);

Input.displayName = 'Input';

export default Input;