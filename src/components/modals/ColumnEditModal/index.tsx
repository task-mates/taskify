'use client';

import { useState } from 'react';
import Modal from '@/src/components/Modal';
import CloseIcon from '@/src/components/icons/icon-close.svg';
import { columnsApi } from '@/src/apis/columns';
import { showToast } from '@/src/utils/toast';
import * as S from './style';
import type { ColumnEditModalProps } from './type';

export default function ColumnEditModal({
  columnId,
  currentTitle,
  onClose,
  onEdited,
}: ColumnEditModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    try {
      await columnsApi.update(columnId, { title: title.trim() });
      showToast.success('칼럼이 수정되었습니다.');
      onEdited?.();
      onClose();
    } catch {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledById="column-edit-modal-title">
      <S.Container>
        <S.Header>
          <S.Title id="column-edit-modal-title">칼럼 관리</S.Title>
          <S.CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            <CloseIcon aria-hidden="true" />
          </S.CloseButton>
        </S.Header>

        <S.Label htmlFor="column-edit-title">이름</S.Label>
        <S.Input
          id="column-edit-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.ConfirmButton
            type="button"
            onClick={() => void handleEdit()}
            disabled={!title.trim() || isLoading}
          >
            변경
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}
