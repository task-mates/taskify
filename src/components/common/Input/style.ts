import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid
    ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-gray-300)'};
  border-radius: 8px;
  font-size: 14px;
  color: var(--color-black-200);
  background: var(--color-white);
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: var(--color-gray-400);
  }

  &:focus {
    border-color: ${({ $hasError }) =>
      $hasError ? 'var(--color-error)' : 'var(--color-brand-500)'};
  }
`;

export const ErrorMessage = styled.span<{ $visible: boolean }>`
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  display: block;
  margin-top: 4px;
  font: var(--xs-12px-medium);
  color: var(--color-red);
`;
