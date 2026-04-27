import Card from './components/Card';
import { columnsApi } from '@/src/apis/columns';
import { cardsApi } from '@/src/apis/cards';
import { Card as CardInfo } from '@/src/apis/cards/type';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const { id } = await params;
  const dashboardId = Number(id);

  const getCardsResponse = await cardsApi.getList({
    columnId: 60868,
    size: 20,
  });

  if (getCardsResponse.totalCount === 0) {
    return <main style={{ padding: '24px' }}>카드가 없습니다.</main>;
  }

  return (
    <main style={{ padding: '24px', maxWidth: 400 }}>
      {getCardsResponse.cards.map((card: CardInfo) => (
        <Card key={card.id} card={card} />
      ))}
    </main>
  );
}
