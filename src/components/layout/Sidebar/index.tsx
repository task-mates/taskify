'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoIcon from '@/public/images/icon-logo.svg';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import CrownIcon from '@/src/components/icons/icon-crown.svg';
import * as S from './styles';
import type { SidebarProps } from '@/src/components/layout/Sidebar/type';

export default function Sidebar({ isOpen, onClose, dashboards, isLoading, isError }: SidebarProps) {
  const pathname = usePathname();

  return (
    <S.Wrapper $isOpen={isOpen}>
      <S.Header>
        <S.TopRow>
          <S.Logo>
            <LogoIcon aria-label="Taskify 로고" />
          </S.Logo>
          {/* 논의 후 아이콘으로 변경 예정 */}
          <S.CloseButton
            type="button"
            onClick={onClose}
            aria-label="사이드바 닫기"
          >
            ✕
          </S.CloseButton>
        </S.TopRow>
        <S.AddSection>
          <S.AddButton>
            <span>대시보드 추가</span>
            <S.IconContainer>
              <PlusIcon aria-hidden="true" />
            </S.IconContainer>
          </S.AddButton>
        </S.AddSection>
      </S.Header>

      <S.Body>
        {isLoading && <div>불러오는 중…</div>}
        {isError && <div>목록을 불러오지 못했습니다.</div>}

        {!isLoading && !isError && dashboards.length > 0 && (
          <S.DashboardList>
            {dashboards.map((board) => (
              <S.DashboardItem
                key={board.id}
                $active={pathname === `/dashboard/${board.id}`}
              >
                <Link href={`/dashboard/${board.id}`}>
                  <S.ColorDot $color={board.color} />
                  <S.Title>{board.title}</S.Title>
                  {board.createdByMe && <CrownIcon aria-hidden="true" />}
                </Link>
              </S.DashboardItem>
            ))}
          </S.DashboardList>
        )}
      </S.Body>
    </S.Wrapper>
  );
}
