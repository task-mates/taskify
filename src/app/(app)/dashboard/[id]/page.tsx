import styled from 'styled-components';
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
    columnsResponse.data.map(async (column) => {
      const cardsResponse = await cardsApi.getList({
        columnId: column.id,
        size: 20,
      });
      return {
        columnId: column.id,
        title: column.title,
        totalCount: cardsResponse.totalCount,
        cards: cardsResponse.cards,
      };
    })
  );

  return (
    <main
      style={{
        padding: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
      }}
    >
      <h1
        style={{
          margin: '0 0 20px 0',
          fontSize: '28px',
          fontWeight: 700,
          color: '#333236',
        }}
      >
        {dashboard.title}
      </h1>
      <div
        style={{
          display: 'flex',
          gap: '16px',
          flex: 1,
          minHeight: 0,
          overflowX: 'auto',
          overflowY: 'hidden',
        }}
      >
        {columnsWithCards.map((column) => (
          <ColumnSection
            key={column.columnId}
            title={column.title}
            totalCount={column.totalCount}
            cards={column.cards}
          />
        ))}
        <AddButton>
          <IconContainer>
            <PlusIcon aria-hidden="true" />
          </IconContainer>
        </AddButton>
      </div>
    </main>
  );
}

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  padding: 10px 20px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #ffffff;
  cursor: pointer;

  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

export const IconContainer = styled.div`
  background-color: #e1eaf1;
  padding: 1px 6px;
  border-radius: 4px;
`;
