import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Section = styled.section`
  max-width: 400px;
  min-width: 400px;

  height: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow: hidden;

  @media ${DEVICE.mobile} {
    min-width: unset;
    width: 100%;
    max-width: 400px;
    height: auto;
    overflow: visible;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media ${DEVICE.mobile} {
    gap: 8px;
  }
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;

  @media ${DEVICE.mobile} {
    flex: 1;
    justify-content: flex-start;
  }
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: var(--color-black-200);
`;

export const Count = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  color: var(--color-black-200);
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
`;

export const Setting = styled.div`
  position: relative;
  margin-top: 4px;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  svg {
    flex-shrink: 0;
    display: block;
  }

  @media ${DEVICE.mobile} {
    margin-top: 0;
  }
`;

export const SettingButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const ActionButtonPopup = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  white-space: nowrap;
  padding: 12px 10px;
  background: var(--color-white);
  border-radius: 12px;
  border: 1px solid var(--color-gray-300);
  z-index: 100;
`;

export const ActionButtonList = styled.ul``;

export const ActionButtonItem = styled.li`
  & + & {
    margin-top: 5px;
    padding-top: 5px;
    position: relative;
  }
  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 93px;
    height: 1px;
    background: var(--color-gray-300);
  }
`;

export const ActionButton = styled.button<{ $variant?: 'default' | 'delete' }>`
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  color: ${({ $variant }) =>
    $variant === 'delete' ? 'var(--color-red)' : 'var(--color-black-200)'};
  display: flex;
  align-items: center;
  gap: 9px;
  transition: background 0.3s;
  width: 100%;

  &:hover {
    background: rgba(243, 245, 248, 0.5);
  }
`;

export const CardList = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  min-height: 0;
  overflow-y: auto;

  @media ${DEVICE.mobile} {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex: none;
    min-height: unset;
    overflow-y: visible;
    width: 100%;
  }
`;

export const ArrowButton = styled.button`
  display: none;

  @media ${DEVICE.mobile} {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    min-width: 40px;
    min-height: 40px;
    padding: 0;
    border: none;
    background: transparent;
    cursor: pointer;

    svg {
      display: block;
    }

    svg path {
      fill: var(--color-gray-400);
    }
  }
`;

export const Empty = styled.p`
  margin: 0;
  font-size: 14px;
  color: var(--color-gray-500);
  text-align: center;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  background-color: var(--color-white);
  cursor: pointer;
  flex-shrink: 0;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  @media ${DEVICE.mobile} {
    min-height: 48px;
  }
`;

export const IconContainer = styled.div`
  background-color: var(--color-brand-surface);
  padding: 5px 5px;
  border-radius: 4px;
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const DraggableWrap = styled.div<{ $isDragging: boolean }>`
  flex-shrink: 0;
  ${({ $isDragging }) =>
    $isDragging &&
    `
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    opacity: 0.95;
  `}
`;
