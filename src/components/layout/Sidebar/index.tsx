'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LogoIcon from '@/public/images/icon-logo.svg';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import CrownIcon from '@/src/components/icons/icon-crown.svg';
import * as S from './styles';
import type { SidebarProps } from '@/src/components/layout/Sidebar/type';
import type { Dashboard } from '@/src/apis/dashboards/type';
import { getDashboardList } from '@/src/apis/dashboards';

const PAGE_SIZE = 20;

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const bodyRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<HTMLDivElement>(null);
  const isFetchingRef = useRef(false);

  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchDashboards = useCallback(async (nextCursorId?: number | null) => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;

    try {
      setIsListLoading(true);

      const data = await getDashboardList({
        size: PAGE_SIZE,
        cursorId: nextCursorId ?? undefined,
      });

      let mergedLength = 0;
      setDashboards((prev) => {
        const merged = nextCursorId
          ? [...prev, ...data.dashboards]
          : data.dashboards;
        mergedLength = merged.length;
        return merged;
      });

      const hasMore =
        mergedLength < data.totalCount && data.dashboards.length > 0;
      setCursorId(hasMore ? data.cursorId : null);

      if (!nextCursorId) {
        setIsError(false);
      }
    } catch (e) {
      console.error(e);
      if (!nextCursorId) {
        setIsError(true);
        setDashboards([]);
      }
      setCursorId(null);
    } finally {
      setIsListLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    setDashboards([]);
    setCursorId(null);
    fetchDashboards(null);
  }, [fetchDashboards]);

  useEffect(() => {
    if (!bodyRef.current || !observerRef.current) return;
    if (!cursorId) return;
    if (isListLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting) {
          fetchDashboards(cursorId);
        }
      },
      {
        root: bodyRef.current,
        threshold: 0.1,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [cursorId, isListLoading, dashboards.length, fetchDashboards]);

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

      <S.Body ref={bodyRef}>
        {isListLoading && dashboards.length === 0 && (
          <div>불러오는 중…</div>
        )}
        {isError && <div>목록을 불러오지 못했습니다.</div>}

        {!isError && dashboards.length > 0 && (
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
            <div ref={observerRef} style={{ height: '1px' }} />
          </S.DashboardList>
        )}

        {!isListLoading && !isError && dashboards.length === 0 && (
          <S.EmptyMessage>대시보드가 없습니다.</S.EmptyMessage>
        )}

        {isListLoading && dashboards.length > 0 && (
          <S.LoadMoreHint>더 불러오는 중…</S.LoadMoreHint>
        )}
      </S.Body>
    </S.Wrapper>
  );
}
