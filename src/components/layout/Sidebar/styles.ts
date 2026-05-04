import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Wrapper = styled.aside<{ $isOpen: boolean }>`
  width: 360px;
  height: 100vh;

  background: #f8f9fb;

  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  @media ${DEVICE.tablet} {
    width: 280px;
  }

  @media ${DEVICE.mobile} {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 280px;
    max-width: 80vw;
    transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
    transition: transform 0.3s ease;
  }
`;

export const CloseButton = styled.button`
  display: none;
  border: none;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  padding: 2px;

  @media ${DEVICE.mobile} {
    display: block;
  }
`;

export const Header = styled.header`
  padding: 20px;
  border-bottom: 1px solid #f2f2f2;
`;

export const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Logo = styled.div`
  margin-bottom: 18px;
`;

export const Body = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const EmptyMessage = styled.p`
  margin: 0;
  padding: 20px;
  font-size: 14px;
  color: #6b7280;
`;

export const LoadMoreHint = styled.p`
  margin: 0;
  padding: 12px 20px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
`;

export const AddSection = styled.div``;

export const AddButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  border: 1px solid #f2f2f2;
  border-radius: 12px;
  background-color: #ffffff;
  text-align: left;
  font-size: 17px;
  font-weight: 500;
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

export const DashboardList = styled.ul`
  margin: 0;
  padding: 20px;
  list-style: none;
`;

export const DashboardItem = styled.li<{ $active: boolean }>`
  width: 100%;
  border-radius: 12px;
  cursor: pointer;
  background-color: ${({ $active }) => ($active ? '#CADFE7' : 'transparent')};

  &:hover {
    background-color: ${({ $active }) => ($active ? '#CADFE7' : '#eef3f8')};
  }

  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 14px 20px;
    border-radius: 12px;
    color: inherit;
    text-decoration: none;
  }
`;

export const Title = styled.span`
  flex: 1;
`;

export const ColorDot = styled.div<{ $color: string }>`
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  margin-right: 20px;
`;
