'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usersApi } from '@/src/apis/users';
import type { User } from '@/src/apis/users/type';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import SettingIcon from '@/src/components/icons/icon-setting.svg';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import CrownIcon from '@/src/components/icons/icon-crown.svg';
import MemberProfiles from '@/src/components/layout/AppHeader/MemberProfiles';
import * as S from './styles';
import type { AppHeaderProps } from '@/src/components/layout/AppHeader/type';

export default function AppHeader({
  onSidebarOpen,
  dashboardId,
  dashboardTitle,
  createdByMe,
}: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isMyDashboard = pathname === '/mydashboard';
  const isMyPage = pathname === '/mypage';
  const isOwnedDashboard = !!dashboardId && createdByMe;
  const isInvitedDashboard = !!dashboardId && !createdByMe;
  const isDashboardPage = !!dashboardId;

  useEffect(() => {
    usersApi
      .getMe()
      .then(setUser)
      .catch((err) => console.error(err));
  }, []);

  return (
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
          <>
            {dashboardTitle}
            {createdByMe && <CrownIcon aria-hidden="true" />}
          </>
        )}
      </S.Title>

      <S.RightSection>
        {isMyDashboard && <>{/* TODO: 마이 대시보드 헤더 콘텐츠 */}</>}
        {isOwnedDashboard && (
          <>
            <S.ActionButton
              type="button"
              onClick={() => router.push(`/dashboard/${dashboardId}/edit`)}
            >
              <SettingIcon aria-hidden="true" />
              관리
            </S.ActionButton>
            <S.ActionButton
              type="button"
              onClick={() => {
                // TODO: 초대하기 모달
              }}
            >
              <PlusIcon aria-hidden="true" />
              초대하기
            </S.ActionButton>
          </>
        )}
        {isDashboardPage && <MemberProfiles dashboardId={dashboardId} />}
        {isInvitedDashboard && <>{/* TODO: 초대받은 대시보드 헤더 콘텐츠 */}</>}

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
            <S.ProfileFallback
              style={{
                background: getProfileColorByNickname(user?.nickname ?? ''),
              }}
            >
              {user?.nickname?.[0] ?? '?'}
            </S.ProfileFallback>
          )}
          <S.ProfileName>{user?.nickname}</S.ProfileName>
        </S.ProfileButton>
      </S.RightSection>
    </S.Wrapper>
  );
}
