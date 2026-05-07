'use client';

import { useState } from 'react';
import axios from 'axios';
import Modal from '@/src/components/Modal';
import CloseIcon from '@/src/components/icons/icon-close.svg';
import { columnsApi } from '@/src/apis/columns';
import { showToast } from '@/src/utils/toast';
import Input from '@/src/components/common/Input';
import * as S from './style';
import type { ColumnCreateModalProps } from './type';

export default function ColumnCreateModal({
  dashboardId,
  onClose,
  onCreated,
}: ColumnCreateModalProps) {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!title.trim()) return;
    setIsLoading(true);
    setError('');
    try {
      await columnsApi.create({ title: title.trim(), dashboardId }, { _skipErrorToast: true });
      showToast.success('칼럼이 생성되었습니다.');
      onCreated?.();
      onClose();
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const message = (err.response?.data as { message?: string })?.message;
        setError(message ?? '칼럼 생성에 실패했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledById="column-create-modal-title">
      <S.Container>
        <S.Header>
          <S.Title id="column-create-modal-title">새 칼럼 생성</S.Title>
          <S.CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            <CloseIcon aria-hidden="true" />
          </S.CloseButton>
        </S.Header>

        <S.Label htmlFor="column-create-title">이름</S.Label>
        <Input
          id="column-create-title"
          type="text"
          placeholder="새로운 프로젝트"
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
            onClick={() => void handleCreate()}
            disabled={!title.trim() || isLoading}
          >
            생성
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}
