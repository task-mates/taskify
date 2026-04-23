import styled, { css } from 'styled-components';
import { ButtonProps } from './type';
import { DEVICE } from '@/src/styles/Breakpoints';

export default function Button({
  children,
  type = 'button',
  onClick,
  variant = 'primary',
}: ButtonProps) {
  return (
    <StyledButton type={type} onClick={onClick} $variant={variant}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button<{ $variant: 'primary' | 'secondary' }>`
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
