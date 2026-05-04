import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background: var(--color-gray-100);
  border-bottom: 1px solid var(--color-gray-300);
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

export const Title = styled.h1`
  display: flex;
  align-items: center;
  gap: 8px;
  font: var(--2lg-18px-bold);
  color: var(--color-gray-900);
  margin-right: auto;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-left: auto;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  font: var(--md-14px-medium);
  color: var(--color-gray-500);
  cursor: pointer;
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
  color: var(--color-white);
  font: var(--lg-14px-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProfileName = styled.span`
  font: var(--lg-16px-medium);
  color: var(--color-black-200);

  @media ${DEVICE.mobile} {
    display: none;
  }
`;
