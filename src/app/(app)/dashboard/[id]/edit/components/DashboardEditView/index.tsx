'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from './styles';
import Confirm from '@/src/components/Confirm';
import DashboardInviteModal from '@/src/components/modals/DashboardInviteModal';
import {
  getDashboardById,
  updateDashboard,
  removeDashboard,
} from '@/src/apis/dashboards';
import { membersApi } from '@/src/apis/members';
import {
  getDashboardInvitationList,
  cancelDashboardInvitation,
} from '@/src/apis/dashboard-invitations';
import Image from 'next/image';
import { usersApi } from '@/src/apis/users';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import { PROFILE_COLORS } from '@/src/styles/profileColor';
import type { Dashboard } from '@/src/apis/dashboards/type';
import type { Member } from '@/src/apis/members/type';
import type { DashboardInvitationResponse } from '@/src/apis/dashboard-invitations/type';

const COLOR_OPTIONS = PROFILE_COLORS;

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
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
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

  const isUnchanged = title === dashboard?.title && color === dashboard?.color;

  const handleChange = async () => {
    setIsSaving(true);
    try {
      const updated = await updateDashboard(dashboardId, { title, color });
      setDashboard(updated);
      alert('대시보드가 수정되었습니다.');
    } catch {
      alert('수정에 실패했습니다. 다시 시도해 주세요.');
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
    await reloadMembers();
  };

  const handleCancelInvitation = async (invitationId: number) => {
    await cancelDashboardInvitation(dashboardId, invitationId);
    await reloadInvitations();
  };

  const handleDeleteDashboard = async () => {
    await removeDashboard(dashboardId);
    router.push('/mydashboard');
  };

  if (!dashboard) return null;

  return (
    <S.PageMain>
      <S.ContentWrapper>
        <S.BackButton onClick={() => router.push(`/dashboard/${dashboardId}`)}>
          ← 돌아가기
        </S.BackButton>

        {/* 대시보드 수정 */}
        <S.Card>
          <S.CardTitle>{dashboard.title}</S.CardTitle>

          <S.Label htmlFor="dashboard-title">대시보드 이름</S.Label>
          <S.TextInput
            id="dashboard-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <S.ColorPickerRow>
            {COLOR_OPTIONS.map((c) => (
              <S.ColorCircle
                key={c}
                $color={c}
                $selected={color === c}
                onClick={() => setColor(c)}
                aria-label={`색상 ${c}`}
              >
                <S.CheckMark $visible={color === c}>✓</S.CheckMark>
              </S.ColorCircle>
            ))}
          </S.ColorPickerRow>

          <S.ChangeButton
            onClick={handleChange}
            disabled={isSaving || isUnchanged}
          >
            변경
          </S.ChangeButton>
        </S.Card>

        {/* 구성원 */}
        <S.Card>
          <S.CardTitle>구성원</S.CardTitle>
          <S.ColumnLabel>이름</S.ColumnLabel>
          <S.ScrollList>
            {members.map((member) => (
              <S.ListRow key={member.id}>
                <S.MemberInfo>
                  {member.profileImageUrl ? (
                    <Image
                      src={member.profileImageUrl}
                      alt={member.nickname}
                      width={34}
                      height={34}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <S.Avatar $bg={getProfileColorByNickname(member.nickname)}>
                      {member.nickname[0]}
                    </S.Avatar>
                  )}
                  <S.MemberName>{member.nickname}</S.MemberName>
                </S.MemberInfo>
                {member.userId !== myUserId && (
                  <S.OutlineButton
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    삭제
                  </S.OutlineButton>
                )}
              </S.ListRow>
            ))}
          </S.ScrollList>
        </S.Card>

        {/* 초대 내역 */}
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
                <S.OutlineButton onClick={() => handleCancelInvitation(inv.id)}>
                  취소
                </S.OutlineButton>
              </S.ListRow>
            ))}
          </S.ScrollList>
        </S.Card>

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

      {isInviteModalOpen && (
        <DashboardInviteModal
          dashboardId={dashboardId}
          onClose={() => setIsInviteModalOpen(false)}
          onInvited={reloadInvitations}
        />
      )}
    </S.PageMain>
  );
}
