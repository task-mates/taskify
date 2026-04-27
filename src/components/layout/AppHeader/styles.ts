import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background: #f8f9fb;
  border-bottom: 1px solid #e0e0e0;
  z-index: 100;

  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const HamburgerButton = styled.button`
  display: none;
  font-size: 24px;

  @media ${DEVICE.mobile} {
    display: block;
  }
`;
