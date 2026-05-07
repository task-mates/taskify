'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from './styles';
import Confirm from '@/src/components/Confirm';
import DashboardInfoSection from './sections/DashboardInfoSection';
import MemberListSection from './sections/MemberListSection';
import InvitationListSection from './sections/InvitationListSection';
import {
  getDashboardById,
  updateDashboard,
  removeDashboard,
} from '@/src/apis/dashboards';
import { showToast } from '@/src/utils/toast';
import { emitDashboardChanged } from '@/src/utils/dashboardListEvent';
import { membersApi } from '@/src/apis/members';
import {
  getDashboardInvitationList,
  cancelDashboardInvitation,
} from '@/src/apis/dashboard-invitations';
import { usersApi } from '@/src/apis/users';
import type { Dashboard } from '@/src/apis/dashboards/type';
import type { Member } from '@/src/apis/members/type';
import type { DashboardInvitationResponse } from '@/src/apis/dashboard-invitations/type';

export default function DashboardEditView({
  dashboardId,
}: {
  dashboardId: number;
}) {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [title, setTitle] = useState('');
  const [color, setColor] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [invitations, setInvitations] = useState<DashboardInvitationResponse[]>(
    []
  );
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    usersApi
      .getMe()
      .then((u) => setMyUserId(u.id))
      .catch(() => null);
  }, []);

  useEffect(() => {
    void getDashboardById(dashboardId).then((data) => {
      setDashboard(data);
      setTitle(data.title);
      setColor(data.color);
    });
  }, [dashboardId]);

  useEffect(() => {
    void membersApi
      .getList(dashboardId)
      .then((data) => setMembers(data.members));
  }, [dashboardId]);

  useEffect(() => {
    void getDashboardInvitationList(dashboardId, {}).then((data) =>
      setInvitations(data.invitations)
    );
  }, [dashboardId]);

  const isTitleEmpty = title.trim() === '';
  const isUnchanged = title === dashboard?.title && color === dashboard?.color;

  const handleUpdateDashboard = async () => {
    if (isTitleEmpty) return;
    setIsSaving(true);
    try {
      const updated = await updateDashboard(dashboardId, { title, color });
      setDashboard(updated);
      showToast.success('대시보드가 수정되었습니다.');
      emitDashboardChanged();
    } catch {
      showToast.error('대시보드 수정에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const reloadMembers = async () => {
    const data = await membersApi.getList(dashboardId);
    setMembers(data.members);
  };

  const reloadInvitations = async () => {
    const data = await getDashboardInvitationList(dashboardId, {});
    setInvitations(data.invitations);
  };

  const handleRemoveMember = async (memberId: number) => {
    await membersApi.remove(memberId);
    showToast.success('구성원이 삭제되었습니다.');
    await reloadMembers();
  };

  const handleCancelInvitation = async (invitationId: number) => {
    await cancelDashboardInvitation(dashboardId, invitationId);
    showToast.success('초대가 취소되었습니다.');
    await reloadInvitations();
  };

  const handleDeleteDashboard = async () => {
    await removeDashboard(dashboardId);
    emitDashboardChanged();
    router.push('/mydashboard');
  };

  if (!dashboard) return null;

  return (
    <S.PageMain>
      <S.ContentWrapper>
        <S.BackButton onClick={() => router.push(`/dashboard/${dashboardId}`)}>
          ← 돌아가기
        </S.BackButton>

        <DashboardInfoSection
          dashboard={dashboard}
          title={title}
          color={color}
          isSaving={isSaving}
          isUnchanged={isUnchanged}
          isTitleEmpty={isTitleEmpty}
          onTitleChange={setTitle}
          onColorChange={setColor}
          onSave={handleUpdateDashboard}
        />

        <MemberListSection
          members={members}
          myUserId={myUserId}
          onRemoveMember={handleRemoveMember}
        />

        <InvitationListSection
          dashboardId={dashboardId}
          invitations={invitations}
          onCancelInvitation={handleCancelInvitation}
          onReload={reloadInvitations}
        />

        <S.DeleteButton onClick={() => setIsDeleteConfirmOpen(true)}>
          대시보드 삭제하기
        </S.DeleteButton>
      </S.ContentWrapper>

      {isDeleteConfirmOpen && (
        <Confirm
          title="대시보드를 삭제하시겠어요?"
          description="삭제된 대시보드는 복구할 수 없습니다."
          confirmText="삭제"
          onConfirm={() => void handleDeleteDashboard()}
          onClose={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </S.PageMain>
  );
}
