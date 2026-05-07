import styled from 'styled-components';
import Button from '@/src/components/common/Button';

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

export const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin: 28px 0 28px;
`;

export const CancelButton = styled(Button).attrs({
  variant: 'secondary',
  height: '52px',
})`
  flex: 1;
  border-radius: 12px;
`;

export const ConfirmButton = styled(Button).attrs({
  variant: 'primary',
  height: '52px',
})`
  flex: 1;
  border-radius: 12px;
`;
