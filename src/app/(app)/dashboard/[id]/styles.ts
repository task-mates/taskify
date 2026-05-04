import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const PageMain = styled.main`
  padding: 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  background: #e1eaf1;
`;

export const PageTitle = styled.h1`
  margin: 0 0 20px 0;
  font-size: 32px;
  font-weight: 700;
  color: #333236;
  display: flex;
  align-items: center;
`;

export const ColorDot = styled.span<{ $color: string }>`
  width: 18px;
  height: 18px;
  margin-right: 12px;
  border-radius: 50%;
  background-color: ${({ $color }) => $color};
  flex-shrink: 0;
  display: inline-block;
`;

export const ColumnList = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  min-height: 0;
  overflow-x: auto;
  overflow-y: hidden;

  @media ${DEVICE.mobile} {
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    align-items: center;
    justify-content: flex-start;
  }
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  flex-shrink: 0;
  width: 20px;
  height: 200px;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }

  @media ${DEVICE.mobile} {
    order: -1;
    width: 100%;
    max-width: 360px;
    height: 20px;
    padding: 20px 10px;
    align-self: center;
  }
`;

export const IconContainer = styled.div`
  background-color: #e1eaf1;
  padding: 1px 6px;
  border-radius: 4px;
`;
