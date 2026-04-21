import styled from 'styled-components';
import Button from '../Button';
import type { ModalActionButtonsProps } from './type';
import { DEVICE } from '@/src/styles/Breakpoints';

export default function ModalActionButtons({
  submitText,
  onCancel,
  cancelText = '취소',
}: ModalActionButtonsProps) {
  return (
    <ButtonGroup>
      <Button type="button" variant="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button type="submit" variant="primary">
        {submitText}
      </Button>
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;

  @media ${DEVICE.mobile} {
    gap: 12px;
  }
`;
