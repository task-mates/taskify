import Card from './components/Card';
import { cardsApi } from '@/src/apis/cards';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DashboardPage({ params }: PageProps) {
  const getCardsResponse = await cardsApi.getList({
    columnId: 60868, //테스트용 컬럼id 지정
    size: 20,
  });

  if (getCardsResponse.totalCount === 0) {
    return <main style={{ padding: '24px' }}>카드가 없습니다.</main>;
  }

  return (
    //TODO: 테스트용 inline-style 지정하였고 레이아웃 작업 시 변경 예정
    <main
      style={{
        padding: '24px',
        maxWidth: 320,
        backgroundColor: '#E1EAF1',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      {getCardsResponse.cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </main>
  );
}
