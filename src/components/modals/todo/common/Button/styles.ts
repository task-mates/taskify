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
  color: #fff;

  ${({ $variant }) =>
    $variant === 'primary'
      ? css`
          background: #83c6e5;
        `
      : css`
          background: #888787;
        `}

  @media ${DEVICE.mobile} {
    height: 50px;
    font-size: 16px;
  }
`;
