'use client';

import { usePathname } from 'next/navigation';
import * as S from './styles';
import type { AppHeaderProps } from '@/src/components/layout/AppHeader/type';

export default function AppHeader({
  onSidebarOpen,
  dashboardId,
  createdByMe,
}: AppHeaderProps) {
  const pathname = usePathname();

  const isMyDashboard = pathname === '/mydashboard';
  const isOwnedDashboard = !!dashboardId && createdByMe;
  const isInvitedDashboard = !!dashboardId && !createdByMe;

  return (
    <S.Wrapper>
      <S.HamburgerButton
        type="button"
        onClick={onSidebarOpen}
        aria-label="사이드바 열기"
      >
        ☰
      </S.HamburgerButton>

      {isMyDashboard && <>{/* TODO: 마이 대시보드 헤더 콘텐츠 */}</>}
      {isOwnedDashboard && <>{/* TODO: 내가 만든 대시보드 헤더 콘텐츠 */}</>}
      {isInvitedDashboard && <>{/* TODO: 초대받은 대시보드 헤더 콘텐츠 */}</>}
    </S.Wrapper>
  );
}
