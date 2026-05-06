'use client';

import { useState } from 'react';
import * as S from '../styles';
import DashboardInviteModal from '@/src/components/modals/DashboardInviteModal';
import type { DashboardInvitationResponse } from '@/src/apis/dashboard-invitations/type';

type Props = {
  dashboardId: number;
  invitations: DashboardInvitationResponse[];
  onCancelInvitation: (invitationId: number) => void;
  onReload: () => void;
};

export default function InvitationListSection({
  dashboardId,
  invitations,
  onCancelInvitation,
  onReload,
}: Props) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  return (
    <>
      <S.Card>
        <S.SectionHeader>
          <S.CardTitle style={{ margin: 0 }}>초대 내역</S.CardTitle>
          <S.InviteButton onClick={() => setIsInviteModalOpen(true)}>
            + 초대하기
          </S.InviteButton>
        </S.SectionHeader>
        <S.ColumnLabel>이메일</S.ColumnLabel>
        <S.ScrollList>
          {invitations.map((inv) => (
            <S.ListRow key={inv.id}>
              <S.EmailText>{inv.invitee.email}</S.EmailText>
              <S.OutlineButton onClick={() => onCancelInvitation(inv.id)}>
                취소
              </S.OutlineButton>
            </S.ListRow>
          ))}
        </S.ScrollList>
      </S.Card>

      {isInviteModalOpen && (
        <DashboardInviteModal
          dashboardId={dashboardId}
          onClose={() => setIsInviteModalOpen(false)}
          onInvited={onReload}
        />
      )}
    </>
  );
}
