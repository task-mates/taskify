import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font: var(--md-14px-medium);
  color: var(--color-black-200);
`;

export const InputContainer = styled.div<{ $isError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  background-color: var(--color-white);
  border: 1px solid ${({ $isError }) => ($isError ? 'var(--color-red)' : 'var(--color-gray-300)')};
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus-within {
    border-color: ${({ $isError }) => ($isError ? 'var(--color-red)' : 'var(--color-brand-500)')};
  }
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 15px 16px;
  font: var(--lg-16px-medium);
  color: var(--color-black-200);
  background: none; 
  outline: none;

  &::placeholder {
    color: var(--color-gray-400);
  }
`;

export const ErrorMessage = styled.span`
  font: var(--xs-12px-medium);
  color: var(--color-red);
  margin-top: 8px; 
`;

export const IconWrapper = styled.div<{ $position: 'left' | 'right' }>`
  display: flex;
  align-items: center;
  
  ${({ $position }) => 
    $position === 'left' 
      ? 'padding-left: 16px; margin-right: -8px;' 
      : 'padding-right: 16px; margin-left: -8px;'
  }
`;