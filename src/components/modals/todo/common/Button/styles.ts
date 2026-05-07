import styled, { css } from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const StyledButton = styled.button<{
  $variant: 'primary' | 'secondary';
}>`
  flex: 1;
  height: 60px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-white);

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          background: var(--color-blue-200);
        `
      : css`
          background: #888787;
        `}

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media ${DEVICE.mobile} {
    height: 50px;
    font-size: 16px;
  }
`;
