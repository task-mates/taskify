'use client';

import * as S from './styles';

interface AppHeaderProps {
  onSidebarOpen: () => void;
}

export default function AppHeader({ onSidebarOpen }: AppHeaderProps) {
  return (
    <S.Wrapper>
      <S.HamburgerButton
        type="button"
        onClick={onSidebarOpen}
        aria-label="사이드바 열기"
      >
        ☰
      </S.HamburgerButton>
    </S.Wrapper>
  );
}
