import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const ListPc = styled.div`
  display: flex;
  align-items: center;

  @media ${DEVICE.tablet} {
    display: none;
  }
`;

export const ListTablet = styled.div`
  display: none;
  align-items: center;

  @media ${DEVICE.tablet} {
    display: flex;
  }
`;

export const MemberIcon = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  margin-left: -8px;
  overflow: hidden;

  &:first-child {
    margin-left: 0;
  }
`;

export const MemberIconFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font: var(--xs-12px-semibold);
`;

export const MemberIconExtra = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--color-white);
  margin-left: -8px;
  background: var(--color-gray-200);
  color: var(--color-gray-600);
  font: var(--xs-12px-semibold);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Popup = styled.div<{ $top: number; $right: number }>`
  position: fixed;
  top: ${({ $top }) => $top}px;
  right: ${({ $right }) => $right}px;
  background: var(--color-white);
  border: 1px solid var(--color-gray-200);
  border-radius: 12px;
  padding: 16px;
  min-width: 180px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 200;
  cursor: default;
`;

export const PopupTitle = styled.p`
  font: var(--sm-13px-medium);
  color: var(--color-gray-400);
  margin: 0 0 10px;
`;

export const PopupList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 240px;
  overflow-y: auto;
`;

export const PopupItem = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PopupAvatar = styled.div`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
`;

export const PopupAvatarFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font: var(--xs-12px-semibold);
  font-weight: 700;
  text-transform: uppercase;
`;

export const PopupName = styled.span`
  font: var(--md-14px-medium);
  color: var(--color-black-200);
  white-space: nowrap;
`;

export const PopupBadge = styled.span`
  font: var(--xs-12px-semibold);
  color: var(--color-gray-400);
  margin-left: 2px;
`;
