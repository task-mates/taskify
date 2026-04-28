import styled from 'styled-components';

// 컬러팔레트 머지되면 색상값 변경

export const Container = styled.div`
  padding: 28px;
  max-width: 584px;
  min-width: 320px;
  width: 100%;
  background: #f3f5f8;
  border-radius: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 700;
  color: #333236;
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333236;
  margin-bottom: 10px;
`;

export const ColorSection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export const ColorCircle = styled.button<{
  $bgColor: string;
  $selected: boolean;
}>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ $bgColor }) => $bgColor};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  opacity: ${({ $selected }) => ($selected ? 1 : 0.6)};
`;
