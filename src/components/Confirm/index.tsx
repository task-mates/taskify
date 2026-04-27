'use client';

import Modal from '@/src/components/Modal';
import * as S from './style';
import type { ConfirmProps } from './type';

export default function Confirm({
  title,
  description,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onClose,
}: ConfirmProps) {
  return (
    <Modal onClose={onClose} labelledById="confirm-modal-title">
      <S.Container>
        <S.Title id="confirm-modal-title">{title}</S.Title>
        {description && <S.Description>{description}</S.Description>}
        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={onClose}>
            {cancelText}
          </S.CancelButton>
          <S.ConfirmButton type="button" onClick={onConfirm}>
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}
