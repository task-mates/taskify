import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 28px 28px 0;
  max-width: 584px;
  min-width: 320px;
  width: 100%;
  overflow: hidden;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: var(--color-black-200);
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-black-200);
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid var(--color-gray-300);
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
    border-color: var(--color-brand-500);
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 28px 0 28px;
`;

export const CancelButton = styled.button`
  flex: 1;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: var(--color-gray-500);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-white);
  cursor: pointer;

  &:hover {
    background: var(--color-gray-600);
  }
`;

export const ConfirmButton = styled.button`
  flex: 1;
  height: 52px;
  border: none;
  border-radius: 12px;
  background: var(--color-brand-300);
  font-size: 16px;
  font-weight: 600;
  color: var(--color-white);
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: var(--color-brand-400);
  }
`;
