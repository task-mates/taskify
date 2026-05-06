import styled, { css } from 'styled-components';

export const Container = styled.div`
  margin: 0 24px;
  padding: 40px 36px 36px;
  width: calc(100% - 48px);
  max-width: 460px;
  background: var(--color-modal); 
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
`;

export const Title = styled.h2`
  font: var(--xl-20px-bold); 
  color: var(--color-white);
  text-align: center;
  line-height: 1.4;
  white-space: pre-wrap;
`;

export const Description = styled.p`
  font: var(--lg-16px-medium-150);
  color: var(--color-gray-400); 
  text-align: center;
`;

export const ButtonGroup = styled.div<{ $type?: 'confirm' | 'alert' }>`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: 8px;
  justify-content: ${({ $type }) => ($type === 'alert' ? 'center' : 'stretch')};
`;

const BaseButton = styled.button`
  flex: 1;
  height: 54px;
  border-radius: 12px;
  font: var(--lg-16px-semibold);
  color: var(--color-white);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const CancelButton = styled(BaseButton)`
  background: var(--color-gray-500); // #787486
`;

export const ConfirmButton = styled(BaseButton)<{ $variant?: 'primary' | 'danger' }>`
  ${({ $variant }) =>
    $variant === 'danger'
      ? css`
          background: var(--color-red); 
        `
      : css`
          background: var(--color-blue-100); 
        `}
`;