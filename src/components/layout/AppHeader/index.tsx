'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usersApi } from '@/src/apis/users';
import type { User } from '@/src/apis/users/type';
import SettingIcon from '@/src/components/icons/icon-setting.svg';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import CrownIcon from '@/src/components/icons/icon-crown.svg';
import MemberProfiles from '@/src/components/layout/AppHeader/MemberProfiles';
import DashboardInviteModal from '@/src/components/modals/DashboardInviteModal';
import * as S from './styles';
import type { AppHeaderProps } from '@/src/components/layout/AppHeader/type';
import ProfileFallback from '../../ProfileFallback';

export default function AppHeader({
  onSidebarOpen,
  dashboardId,
  dashboardTitle,
  createdByMe,
}: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const isMyDashboard = pathname === '/mydashboard';
  const isMyPage = pathname === '/mypage';
  const isOwnedDashboard = !!dashboardId && createdByMe;
  const isDashboardPage = !!dashboardId;

  useEffect(() => {
    usersApi
      .getMe()
      .then((user) => {
        setUser(user);
      })
      .catch(() => null);
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.HamburgerButton
          type="button"
          onClick={onSidebarOpen}
          aria-label="사이드바 열기"
        >
          ☰
        </S.HamburgerButton>

        <S.Title>
          {isMyDashboard && '내 대시보드'}
          {isMyPage && '계정관리'}
          {isDashboardPage && (
            <S.TitleLink href={`/dashboard/${dashboardId}`}>
              {dashboardTitle}
              {createdByMe && <CrownIcon aria-hidden="true" />}
            </S.TitleLink>
          )}
        </S.Title>

        <S.RightSection>
          {isOwnedDashboard && (
            <>
              <S.ActionButton
                type="button"
                onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
              >
                <SettingIcon aria-hidden="true" />
                <S.ButtonLabel>관리</S.ButtonLabel>
              </S.ActionButton>
              <S.ActionButton
                type="button"
                onClick={() => setIsInviteModalOpen(true)}
              >
                <PlusIcon aria-hidden="true" />
                <S.ButtonLabel>초대하기</S.ButtonLabel>
              </S.ActionButton>
            </>
          )}
          {isDashboardPage && <MemberProfiles dashboardId={dashboardId} />}
          <S.Divider />
          <S.ProfileButton type="button" onClick={() => router.push('/mypage')}>
            {user?.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                alt={user.nickname}
                width={38}
                height={38}
                style={{ borderRadius: '50%', objectFit: 'cover' }}
              />
            ) : (
              <ProfileFallback nickname={user?.nickname} />
            )}
            <S.ProfileName>{user?.nickname}</S.ProfileName>
          </S.ProfileButton>
        </S.RightSection>
      </S.Wrapper>

      {isInviteModalOpen && dashboardId && (
        <DashboardInviteModal
          dashboardId={dashboardId}
          onClose={() => setIsInviteModalOpen(false)}
        />
      )}
    </>
  );
}
