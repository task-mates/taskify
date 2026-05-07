import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import { ModalVariant } from './type';

export const Overlay = styled.div<{ $overlayVariant: ModalVariant }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-overlay);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;

  @media ${DEVICE.mobile} {
    ${({ $overlayVariant }) =>
      $overlayVariant === 'full'
        ? `
        align-items: flex-start;
      `
        : `
        align-items: center;
      `}
  }
`;

export const DialogContainer = styled.div`
  display: contents;
`;
