import styled from 'styled-components';

export const Container = styled.div`
  background: var(--color-white);
  border-radius: 16px;
  padding: 28px 28px 0;
  max-width: 584px;
  min-width: 320px;
  width: 100%;
  overflow: hidden;
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
  color: var(--color-black-200);
`;

export const CloseButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--color-black-200);
  margin-bottom: 10px;
`;

export const ColorSection = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 28px 0;
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
  opacity: 1;
`;
