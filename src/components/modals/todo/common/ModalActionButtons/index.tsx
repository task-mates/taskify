import type { ModalActionButtonsProps } from './type';
import * as S from './styles';

export default function ModalActionButtons({
  submitText,
  onCancel,
  cancelText = '취소',
  formId,
  submitDisabled,
}: ModalActionButtonsProps) {
  return (
    <S.ButtonGroup>
      <S.ActionButton type="button" variant="secondary" onClick={onCancel}>
        {cancelText}
      </S.ActionButton>
      <S.ActionButton
        type="submit"
        variant="primary"
        form={formId}
        disabled={submitDisabled}
      >
        {submitText}
      </S.ActionButton>
    </S.ButtonGroup>
  );
}
