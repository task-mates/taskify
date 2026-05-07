'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import ArrowRightIcon from '@/src/components/icons/icon_arrow_right.svg';
import DashboardCreateModal from '@/src/components/modals/DashboardCreateModal';
import { getDashboardList } from '@/src/apis/dashboards';
import type { Dashboard } from '@/src/apis/dashboards/type';
import { getInvitationList, updateInvitation } from '@/src/apis/invitations';
import type { Invitation } from '@/src/apis/invitations/type';
import * as S from './styles';

const dashboardLinkStyle = {
  display: 'flex',
  alignItems: 'center',
  boxSizing: 'border-box',
  width: '100%',
  height: '100%',
  padding: '14px 18px',
  color: 'inherit',
  textDecoration: 'none',
} as const;

const INVITATION_PAGE_SIZE = 20;
const SEARCH_DEBOUNCE_MS = 250;
const DESKTOP_MEDIA_QUERY = '(min-width: 1024px)';
const MAX_DASHBOARD_FETCH_REQUESTS = 50;

export default function MyDashboardPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isDashboardsLoading, setIsDashboardsLoading] = useState(true);
  const [isDashboardsError, setIsDashboardsError] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [invitationKeywordInput, setInvitationKeywordInput] = useState('');
  const [invitationKeyword, setInvitationKeyword] = useState('');
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [invitationCursorId, setInvitationCursorId] = useState<number | null>(
    null
  );
  const [hasMoreInvitations, setHasMoreInvitations] = useState(true);
  const [isInvitationsLoading, setIsInvitationsLoading] = useState(true);
  const [isInvitationsError, setIsInvitationsError] = useState(false);
  const [isInvitationsFetchingMore, setIsInvitationsFetchingMore] =
    useState(false);
  const [actingInvitationIds, setActingInvitationIds] = useState<Set<number>>(
    () => new Set()
  );

  const invitedPanelRef = useRef<HTMLDivElement | null>(null);
  const invitedSentinelRef = useRef<HTMLDivElement | null>(null);
  const myDashboardCarouselRef = useRef<HTMLUListElement | null>(null);

  const loadAllDashboards = useCallback(async () => {
    setIsDashboardsLoading(true);
    setIsDashboardsError(false);

    try {
      const size = 50;
      let cursorId: number | undefined;
      let prevCursorId: number | undefined;
      const all: Dashboard[] = [];

      for (let i = 0; i < MAX_DASHBOARD_FETCH_REQUESTS; i += 1) {
        const { dashboards: chunk, cursorId: nextCursorId } =
          await getDashboardList(cursorId ? { size, cursorId } : { size });

        all.push(...chunk);

        if (!chunk.length) break;
        if (typeof nextCursorId !== 'number') break;
        if (prevCursorId === nextCursorId) break;
        if (chunk.length < size) break;

        prevCursorId = cursorId;
        cursorId = nextCursorId;
      }

      setDashboards(all);
    } catch (e) {
      console.error(e);
      setIsDashboardsError(true);
      setDashboards([]);
    } finally {
      setIsDashboardsLoading(false);
    }
  }, []);

  useEffect(() => {
    const run = () => {
      void loadAllDashboards();
    };
    const id = window.setTimeout(run, 0);
    return () => window.clearTimeout(id);
  }, [loadAllDashboards]);

  const myDashboards = useMemo(
    () => dashboards.filter((d) => d.createdByMe),
    [dashboards]
  );

  const visibleInvitations = invitations;

  useEffect(() => {
    const t = window.setTimeout(() => {
      setInvitationKeyword(invitationKeywordInput);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [invitationKeywordInput]);

  useEffect(() => {
    const loadInitialInvitations = async () => {
      setIsInvitationsLoading(true);
      setIsInvitationsError(false);

      try {
        const { invitations: next, cursorId: nextCursor } =
          await getInvitationList({
            size: INVITATION_PAGE_SIZE,
            title: invitationKeyword.trim()
              ? invitationKeyword.trim()
              : undefined,
          });

        setInvitations(next);
        setInvitationCursorId(nextCursor);
        setHasMoreInvitations(Boolean(nextCursor) && next.length > 0);
      } catch (e) {
        console.error(e);
        setIsInvitationsError(true);
        setInvitations([]);
        setInvitationCursorId(null);
        setHasMoreInvitations(false);
      } finally {
        setIsInvitationsLoading(false);
      }
    };

    void loadInitialInvitations();
  }, [invitationKeyword]);

  const loadMoreInvitations = useCallback(async () => {
    if (!invitationCursorId) return;

    setIsInvitationsFetchingMore(true);
    try {
      const { invitations: next, cursorId: nextCursor } =
        await getInvitationList({
          size: INVITATION_PAGE_SIZE,
          cursorId: invitationCursorId,
          title: invitationKeyword.trim()
            ? invitationKeyword.trim()
            : undefined,
        });

      setInvitations((prev) => [...prev, ...next]);
      setInvitationCursorId(nextCursor);
      setHasMoreInvitations(Boolean(nextCursor) && next.length > 0);
    } catch (e) {
      console.error(e);
      setIsInvitationsError(true);
    } finally {
      setIsInvitationsFetchingMore(false);
    }
  }, [invitationCursorId, invitationKeyword]);

  useEffect(() => {
    if (!invitedPanelRef.current || !invitedSentinelRef.current) return;

    const root = invitedPanelRef.current;
    const target = invitedSentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (!first?.isIntersecting) return;
        if (isInvitationsLoading || isInvitationsFetchingMore) return;
        if (!hasMoreInvitations) return;
        void loadMoreInvitations();
      },
      { root, rootMargin: '120px', threshold: 0.1 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [
    hasMoreInvitations,
    isInvitationsFetchingMore,
    isInvitationsLoading,
    loadMoreInvitations,
  ]);

  const actOnInvitation = useCallback(
    async (invitationId: number, inviteAccepted: boolean) => {
      setActingInvitationIds((prev) => new Set(prev).add(invitationId));
      try {
        await updateInvitation(invitationId, { inviteAccepted });
        setInvitations((prev) => prev.filter((i) => i.id !== invitationId));

        // 수락 시 "내 대시보드" 목록도 업데이트
        if (inviteAccepted) {
          void loadAllDashboards();
        }
      } catch (e) {
        console.error(e);
      } finally {
        setActingInvitationIds((prev) => {
          const next = new Set(prev);
          next.delete(invitationId);
          return next;
        });
      }
    },
    [loadAllDashboards]
  );

  useEffect(() => {
    const el = myDashboardCarouselRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (!window.matchMedia(DESKTOP_MEDIA_QUERY).matches) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      if (el.scrollWidth <= el.clientWidth) return;

      e.preventDefault();
      const delta = e.deltaY * 1.5;
      const next = Math.max(
        0,
        Math.min(el.scrollLeft + delta, el.scrollWidth - el.clientWidth)
      );
      el.scrollLeft = next;
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <S.Page>
      <S.PageTitle>홈</S.PageTitle>

      {isDashboardsLoading && <S.StatusText>불러오는 중…</S.StatusText>}
      {isDashboardsError && !isDashboardsLoading && (
        <S.StatusText>대시보드 목록을 불러오지 못했습니다.</S.StatusText>
      )}

      {!isDashboardsLoading && !isDashboardsError && (
        <>
          <S.Section aria-labelledby="my-dashboards-heading">
            <S.SectionHeading id="my-dashboards-heading">
              내 대시보드
            </S.SectionHeading>
            <S.MyDashboardsRow>
              <S.MyDashboardCards ref={myDashboardCarouselRef}>
                <S.MyDashboardCard>
                  <S.NewDashboardTrigger
                    type="button"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <S.NewDashboardLabel>새로운 대시보드</S.NewDashboardLabel>
                    <S.PlusIconBox>
                      <S.StyledPlusIcon aria-hidden />
                    </S.PlusIconBox>
                  </S.NewDashboardTrigger>
                </S.MyDashboardCard>

                {myDashboards.map((board) => (
                  <S.MyDashboardCard key={board.id}>
                    <Link
                      href={`/dashboard/${board.id}`}
                      style={dashboardLinkStyle}
                    >
                      <S.ColorDot $color={board.color} aria-hidden />
                      <S.DashboardTitle>{board.title}</S.DashboardTitle>
                      <ArrowRightIcon aria-hidden="true" />
                    </Link>
                  </S.MyDashboardCard>
                ))}
              </S.MyDashboardCards>
            </S.MyDashboardsRow>
          </S.Section>

          <S.Section aria-labelledby="invited-dashboards-heading">
            <S.SectionHeading id="invited-dashboards-heading">
              초대받은 대시보드
            </S.SectionHeading>

            <S.InvitedPanel
              ref={invitedPanelRef}
              $empty={!isInvitationsLoading && visibleInvitations.length === 0}
            >
              <S.InvitedToolbar>
                <S.SearchInputWrapper>
                  <S.InvitedSearchIcon aria-hidden />
                  <S.InvitedSearchInput
                    value={invitationKeywordInput}
                    onChange={(e) => setInvitationKeywordInput(e.target.value)}
                    placeholder="검색"
                    aria-label="초대받은 대시보드 검색"
                  />
                </S.SearchInputWrapper>
              </S.InvitedToolbar>

              {isInvitationsLoading ? (
                <S.StatusText>불러오는 중…</S.StatusText>
              ) : isInvitationsError ? (
                <S.StatusText>초대 목록을 불러오지 못했어요</S.StatusText>
              ) : visibleInvitations.length === 0 ? (
                invitationKeyword.trim() ? (
                  <S.InvitedNoResultState>
                    <S.EmptyInvitedText>검색 결과가 없어요</S.EmptyInvitedText>
                  </S.InvitedNoResultState>
                ) : (
                  <S.InvitedEmptyInner>
                    <S.InvitedEmptyIllustration aria-hidden />
                    <S.EmptyInvitedText>
                      아직 초대받은 대시보드가 없어요
                    </S.EmptyInvitedText>
                  </S.InvitedEmptyInner>
                )
              ) : (
                <S.InvitedTable>
                  <S.InvitedTableHeader>
                    <span>이름</span>
                    <span>초대자</span>
                    <span>수락 여부</span>
                  </S.InvitedTableHeader>

                  {visibleInvitations.map((inv) => {
                    const isActing = actingInvitationIds.has(inv.id);
                    return (
                      <S.InvitedTableRow key={inv.id}>
                        <S.InvitedTitle>{inv.dashboard.title}</S.InvitedTitle>
                        <S.InvitedInviter>
                          {inv.inviter.nickname}
                        </S.InvitedInviter>
                        <S.InvitedActions>
                          <S.InvitedActionButton
                            type="button"
                            onClick={() => void actOnInvitation(inv.id, false)}
                            disabled={isActing}
                            $variant="secondary"
                          >
                            거절
                          </S.InvitedActionButton>
                          <S.InvitedActionButton
                            type="button"
                            onClick={() => void actOnInvitation(inv.id, true)}
                            disabled={isActing}
                            $variant="primary"
                          >
                            수락
                          </S.InvitedActionButton>
                        </S.InvitedActions>
                      </S.InvitedTableRow>
                    );
                  })}

                  <S.InvitedSentinel ref={invitedSentinelRef} />

                  {isInvitationsFetchingMore ? (
                    <S.StatusText>더 불러오는 중…</S.StatusText>
                  ) : null}
                </S.InvitedTable>
              )}
            </S.InvitedPanel>
          </S.Section>
        </>
      )}

      {isCreateModalOpen ? (
        <DashboardCreateModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={() => void loadAllDashboards()}
        />
      ) : null}
    </S.Page>
  );
}
