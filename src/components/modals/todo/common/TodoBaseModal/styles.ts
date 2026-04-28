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

  @media ${DEVICE.heightMd} {
    height: 90vh;
  }

  @media ${DEVICE.mobile} {
    max-width: none;
    border: none;
    border-radius: 0;
    height: 100%;
    padding: 0 30px;
  }

  @media (max-width: 499px),
    ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding: 0;
    overflow: auto;
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;

  @media ${DEVICE.mobile} {
    padding-top: 24px;
    max-height: none;
  }

  @media (max-width: 499px),
    ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding-right: 0;
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
        min-height: 80px;
      }

      @media (max-width: 499px),
    ${DEVICE.mobile} and (hover: none) and (pointer: coarse){
        margin-left: 30px;
        margin-right: 30px;
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
  flex: 1;
  overflow: auto;

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

  @media ${DEVICE.mobile} {
    padding-top: 20px;
    padding-bottom: 30px;
  }

  @media (max-width: 499px),
    ${DEVICE.mobile} and (hover: none) and (pointer: coarse) {
    padding-left: 30px;
    padding-right: 30px;
  }
`;
