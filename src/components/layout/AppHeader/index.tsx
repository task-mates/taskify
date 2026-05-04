'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { usersApi } from '@/src/apis/users';
import type { User } from '@/src/apis/users/type';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import * as S from './styles';
import type { AppHeaderProps } from '@/src/components/layout/AppHeader/type';

export default function AppHeader({
  onSidebarOpen,
  dashboardId,
  createdByMe,
}: AppHeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const isMyDashboard = pathname === '/mydashboard';
  const isOwnedDashboard = !!dashboardId && createdByMe;
  const isInvitedDashboard = !!dashboardId && !createdByMe;

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

      <S.RightSection>
        {isMyDashboard && <>{/* TODO: 마이 대시보드 헤더 콘텐츠 */}</>}
        {isOwnedDashboard && <>{/* TODO: 내가 만든 대시보드 헤더 콘텐츠 */}</>}
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
                background: user?.nickname
                  ? getProfileColorByNickname(user.nickname)
                  : '#E0E0E0',
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
