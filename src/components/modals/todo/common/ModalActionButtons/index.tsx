import Button from '../Button';
import type { ModalActionButtonsProps } from './type';
import * as S from './styles';

export default function ModalActionButtons({
  submitText,
  onCancel,
  cancelText = '취소',
}: ModalActionButtonsProps) {
  return (
    <S.ButtonGroup>
      <Button type="button" variant="secondary" onClick={onCancel}>
        {cancelText}
      </Button>
      <Button type="submit" variant="primary">
        {submitText}
      </Button>
    </S.ButtonGroup>
  );
}
