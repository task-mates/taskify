import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Section = styled.section`
  min-width: 320px;
  height: 100%;
  padding: 16px;
  border-radius: 16px;

  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow: auto;

  @media ${DEVICE.mobile} {
    min-width: unset;
    height: auto;
    overflow: visible;

    max-width: 400px;
  }
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #333236;
`;

export const Count = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #333236;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
`;

export const Setting = styled.div`
  cursor: pointer;
  margin-top: 4px;

  display: flex;
  gap: 8px;
`;

export const CardList = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
  overflow-y: auto;

  @media ${DEVICE.mobile} {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex: none;
    min-height: unset;
    overflow-y: visible;
  }
`;

export const ArrowButton = styled.button<{ $isOpen: boolean }>`
  display: none; /* 데스크탑에서는 숨김 */
  transition: transform 0.2s;

  @media ${DEVICE.mobile} {
    display: block;
    transform: ${({ $isOpen }) =>
      $isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  }
`;

export const Empty = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const IconContainer = styled.div`
  background-color: #e1eaf1;
  padding: 1px 6px;
  border-radius: 4px;
`;
