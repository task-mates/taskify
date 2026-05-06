'use client';

import { useState } from 'react';
import Modal from '@/src/components/Modal';
import CloseIcon from '@/src/components/icons/icon-close.svg';
import { createDashboardInvitation } from '@/src/apis/dashboard-invitations';
import * as S from './style';
import type { DashboardInviteModalProps } from './type';

export default function DashboardInviteModal({
  dashboardId,
  onClose,
  onInvited,
}: DashboardInviteModalProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInvite = async () => {
    if (!email.trim()) return;
    setIsLoading(true);
    try {
      await createDashboardInvitation(dashboardId, { email: email.trim() });
      onInvited?.();
      onClose();
    } catch {
      alert('초대에 실패했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} labelledById="invite-modal-title">
      <S.Container>
        <S.Header>
          <S.Title id="invite-modal-title">초대하기</S.Title>
          <S.CloseButton type="button" aria-label="모달 닫기" onClick={onClose}>
            <CloseIcon aria-hidden="true" />
          </S.CloseButton>
        </S.Header>

        <S.Label htmlFor="invite-email">이메일</S.Label>
        <S.Input
          id="invite-email"
          type="email"
          placeholder="이메일을 입력해주세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <S.ButtonGroup>
          <S.CancelButton type="button" onClick={onClose}>
            취소
          </S.CancelButton>
          <S.ConfirmButton
            type="button"
            onClick={() => void handleInvite()}
            disabled={!email.trim() || isLoading}
          >
            초대
          </S.ConfirmButton>
        </S.ButtonGroup>
      </S.Container>
    </Modal>
  );
}
