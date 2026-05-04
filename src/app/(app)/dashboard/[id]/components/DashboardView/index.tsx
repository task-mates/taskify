'use client';

import { useEffect, useState } from 'react';
import * as S from './styles';
import ColumnSection from '../ColumnSection';
import { getDashboardById } from '@/src/apis/dashboards';
import { columnsApi } from '@/src/apis/columns';
import { cardsApi } from '@/src/apis/cards';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import type { Dashboard } from '@/src/apis/dashboards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';

type ColumnWithCards = {
  columnId: number;
  title: string;
  totalCount: number;
  cards: CardInfo[];
};

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

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      try {
        const dashboardData = await getDashboardById(dashboardId);
        const columnsResponse = await columnsApi.getList(dashboardId);
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

    void load();

    return () => {
      cancelled = true;
    };
  }, [dashboardId]);

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
      <S.ColumnList>
        {columnsWithCards.map((column) => (
          <ColumnSection
            key={column.columnId}
            title={column.title}
            totalCount={column.totalCount}
            cards={column.cards}
          />
        ))}
        <S.AddButton>
          <S.IconContainer>
            <PlusIcon aria-hidden="true" />
          </S.IconContainer>
        </S.AddButton>
      </S.ColumnList>
    </S.PageMain>
  );
}
