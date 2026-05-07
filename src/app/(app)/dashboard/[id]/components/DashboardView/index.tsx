'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import * as S from './styles';
import ColumnSection from '../ColumnSection';
import ColumnCreateModal from '@/src/components/modals/ColumnCreateModal';
import { getDashboardById } from '@/src/apis/dashboards';
import { columnsApi } from '@/src/apis/columns';
import { cardsApi } from '@/src/apis/cards';
import type { Dashboard } from '@/src/apis/dashboards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import {
  applyDragResult,
  type ColumnWithCards,
} from '@/src/app/(app)/dashboard/[id]/utils/applyDragResult';

type DashboardViewProps = {
  dashboardId: number;
};

export default function DashboardView({ dashboardId }: DashboardViewProps) {
  const [dashboard, setDashboard] = useState<Dashboard | null>(null);
  const [columnsWithCards, setColumnsWithCards] = useState<ColumnWithCards[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const loadRef = useRef<(() => Promise<void>) | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const [dashboardData, columnsResponse] = await Promise.all([
          getDashboardById(dashboardId),
          columnsApi.getList(dashboardId),
        ]);
        const columnsData: ColumnWithCards[] = await Promise.all(
          columnsResponse.data.map((column) =>
            cardsApi
              .getList({ columnId: column.id, size: 20 })
              .then((cardsResponse) => ({
                columnId: column.id,
                title: column.title,
                totalCount: cardsResponse.totalCount,
                cards: cardsResponse.cards,
              }))
          )
        );

        if (!cancelled) {
          setDashboard(dashboardData);
          setColumnsWithCards(columnsData);
        }
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : '데이터를 불러오지 못했습니다.'
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadRef.current = load;
    void load();

    return () => {
      cancelled = true;
    };
  }, [dashboardId]);

  const handleRefresh = () => {
    void loadRef.current?.();
  };

  const handleDragEnd = useCallback((result: DropResult) => {
    if (!result.destination) return;

    const destColId = Number(result.destination.droppableId);
    const sourceColId = Number(result.source.droppableId);
    const cardId = Number(result.draggableId);

    let previous: ColumnWithCards[] | null = null;

    setColumnsWithCards((prev) => {
      const applied = applyDragResult(prev, result);
      if (!applied) return prev;
      previous = prev;
      return applied;
    });

    if (sourceColId === destColId || previous === null) return;

    const snapshot = previous;

    cardsApi.update(cardId, { columnId: destColId }).catch(() => {
      setColumnsWithCards(snapshot);
    });
  }, []);

  if (loading) {
    return (
      <S.PageMain>
        <p>불러오는 중...</p>
      </S.PageMain>
    );
  }

  if (error || !dashboard) {
    return (
      <S.PageMain>
        <p>{error ?? '대시보드를 찾을 수 없습니다.'}</p>
      </S.PageMain>
    );
  }

  return (
    <S.PageMain>
      <S.PageTitle>
        <S.ColorDot $color={dashboard.color} />
        {dashboard.title}
      </S.PageTitle>
      <DragDropContext onDragEnd={handleDragEnd}>
        <S.ColumnList>
          {columnsWithCards.map((column) => (
            <ColumnSection
              key={column.columnId}
              dashboardId={dashboardId}
              columnId={column.columnId}
              title={column.title}
              totalCount={column.totalCount}
              cards={column.cards}
              onUpdated={handleRefresh}
            />
          ))}
          <S.AddButton
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            aria-label="새 칼럼 추가"
          >
            <S.IconContainer>
              <PlusIcon aria-hidden="true" />
            </S.IconContainer>
          </S.AddButton>
        </S.ColumnList>
      </DragDropContext>

      {isCreateModalOpen && (
        <ColumnCreateModal
          dashboardId={dashboardId}
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={handleRefresh}
        />
      )}
    </S.PageMain>
  );
}
