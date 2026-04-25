import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import { HeaderVariant } from './type';

export const Container = styled.div`
  position: relative;
  padding: 30px;
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  height: 80vh;
  background: #f3f5f8;
  border: 1px solid #9fa6b2;
  border-radius: 24px;

  @media ${DEVICE.mobile} {
    padding: 0 10px 0 30px;
    max-width: none;
    border: none;
    border-radius: 0;
    height: 100%;
  }

  @media (max-width: 499px) {
    padding: 0 30px;
    overflow: auto;
  }

  @media ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding: 0 30px;
    overflow: auto;
  }
`;

export const Wrapper = styled.div`
  height: 100%;

  scrollbar-color: #5b5963 transparent;

  @media ${DEVICE.mobile} {
    max-height: none;
    padding: 24px 14px 24px 0;
    padding-top: 24px;
    padding-right: 14px;
    padding-bottom: 24px;
    height: 100%;
  }

  @media (max-width: 499px) {
    padding-right: 0;
    height: auto;
  }

  @media ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding-right: 0;
    height: auto;
  }
`;

export const Header = styled.div<{ $variant: HeaderVariant }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $variant }) =>
    $variant === 'card' &&
    `
      padding-bottom: 24px;
      border-bottom: 1px solid #D9D9D9;
      min-height: 90px;

      @media ${DEVICE.mobile}{
        padding-bottom: 20px;
      }
  `}
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h2`
  width: 82%;
  font-size: 24px;
  font-weight: 600;
  color: #333236;

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

export const Content = styled.div`
  padding-top: 30px;
  height: calc(100% - 90px);
  overflow: auto;
`;
