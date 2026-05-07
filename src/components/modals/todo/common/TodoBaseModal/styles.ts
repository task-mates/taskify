import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import { HeaderVariant, layoutVariant } from './type';

export const Container = styled.div<{ $variant: layoutVariant }>`
  position: relative;
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  height: 80vh;
  max-height: 952px;
  background: var(--color-gray-100);
  border: 1px solid var(--color-gray-400);
  border-radius: 24px;
  padding: 30px 0 0;

  ${({ $variant }) =>
    $variant === 'card' &&
    `
      padding: 30px 0 14px;
  `}

  @media ${DEVICE.heightMd} {
    height: 90vh;
  }

  @media ${DEVICE.mobile} {
    padding: 24px 0 0;
    max-width: none;
    max-height: none;
    border: none;
    border-radius: 0;
    height: 100%;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${DEVICE.mobile} {
    max-height: none;
  }
`;

export const Header = styled.div<{ $variant: HeaderVariant }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 30px;
  padding-bottom: 24px;

  ${({ $variant }) =>
    $variant === 'card' &&
    `
      border-bottom: 1px solid var(--color-gray-300);
      min-height: 90px;

      @media ${DEVICE.mobile}{
        padding-bottom: 20px;
        min-height: 80px;
      }
  `}

  @media ${DEVICE.mobile} {
    margin: 0 20px;
  }
`;

export const HeaderLeft = styled.div`
  display: block;
  width: 100%;
`;
export const TitleBox = styled.div`
  width: 82%;
`;
export const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--color-black-200);

  @media ${DEVICE.mobile} {
    font-size: 20px;
  }
`;

export const HeaderRight = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media ${DEVICE.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const Content = styled.div<{ $variant: layoutVariant }>`
  padding: 4px 30px 0;
  flex: 1;
  overflow: auto;

  ${({ $variant }) =>
    $variant === 'card' &&
    `
    padding: 30px 30px 0;  
  `}

  @media ${DEVICE.mobile} {
    padding: 14px 20px;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0000001a;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #0003;
  }
`;

export const Footer = styled.div`
  padding: 30px;

  @media ${DEVICE.mobile} {
    padding: 20px;
  }
`;
