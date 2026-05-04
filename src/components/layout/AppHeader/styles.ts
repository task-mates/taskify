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

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

export const ProfileFallback = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.span`
  font: var(--lg-16px-medium);
  color: #333;

  @media ${DEVICE.mobile} {
    display: none;
  }
`;
