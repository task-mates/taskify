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
  line-height: var(--lh-normal);
`;

export const StyledInput = styled.input<{ $isError?: boolean }>`
  width: 100%;
  padding: 15px 16px; 

  font: var(--lg-16px-medium);
  color: var(--color-black-200);
  background-color: var(--color-white);
  
  border-radius: 8px;
  border: 1px solid ${({ $isError }) => ($isError ? 'var(--color-red)' : 'var(--color-gray-300)')};
  
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: var(--color-gray-400);
  }

  &:focus {
    border-color: ${({ $isError }) => ($isError ? 'var(--color-red)' : 'var(--color-brand-500)')};
  }

  &:disabled {
    background-color: var(--color-gray-100);
    color: var(--color-gray-400);
    cursor: not-allowed;
  }
`;

export const ErrorMessage = styled.span`
  font: var(--xs-12px-medium);
  color: var(--color-red);
  margin-top: 4px;
`;