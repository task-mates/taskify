'use client';

import Modal from '@/src/components/Modal';
import * as S from './style';
import type { ToastProps } from './type';

export default function Toast({
  message,
  confirmText = '확인',
  onConfirm,
  onClose,
}: ToastProps) {
  return (
    <Modal onClose={onClose} labelledById="toast-alert-title">
      <S.Container>
        <S.Title id="toast-alert-title">{message}</S.Title>
        
        <S.ButtonGroup>
          <S.ConfirmButton
            type="button"
            onClick={() => {
              onConfirm?.(); 
              onClose();
            }}
          >
            {confirmText}
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}