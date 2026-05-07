'use client';

import { useState } from 'react';
import axios from 'axios';
import Modal from '@/src/components/Modal';
import CloseIcon from '@/src/components/icons/icon-close.svg';
import { columnsApi } from '@/src/apis/columns';
import { showToast } from '@/src/utils/toast';
import Input from '@/src/components/common/Input';
import * as S from './style';
import type { ColumnEditModalProps } from './type';

export default function ColumnEditModal({
  columnId,
  currentTitle,
  onClose,
  onEdited,
}: ColumnEditModalProps) {
  const [title, setTitle] = useState(currentTitle);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleEdit = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      await columnsApi.update(columnId, { title: title.trim() }, { _skipErrorToast: true });
      showToast.success('칼럼이 수정되었습니다.');
      onEdited?.();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data as { message?: string })?.message;
        setError(message ?? '칼럼 수정에 실패했습니다.');
      }
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
        <Input
          id="column-edit-title"
          type="text"
          value={title}
          error={error}
          onChange={(e) => { setTitle(e.target.value); setError(''); }}
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
