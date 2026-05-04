import * as S from './styles';
import ColumnSection from './components/ColumnSection';
import { dashboardsApi } from '@/src/apis/dashboards';
import { columnsApi } from '@/src/apis/columns';
import { cardsApi } from '@/src/apis/cards';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';

type PageProps = {
  params: Promise<{ id: string }>;
};

type ColumnWithCards = {
  columnId: number;
  title: string;
  totalCount: number;
  cards: CardInfo[];
};

export default async function DashboardPage({ params }: PageProps) {
  const { id } = await params;
  const dashboardId = Number(id);

  const dashboard = await dashboardsApi.getById(dashboardId);
  const columnsResponse = await columnsApi.getList(dashboardId);

  const columnsWithCards: ColumnWithCards[] = await Promise.all(
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
