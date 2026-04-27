import Card from './components/Card';
import type { CardData } from './components/Card/type';

export default function Dashboard() {
  const mockCard: CardData = {
    id: 1,
    title: 'GUI 디자인',
    description: '디자인 작업',
    tags: ['프로젝트', '디자인', '상'],
    dueDate: '2025년 7월 20일',
    assignee: {
      id: 1,
      nickname: '민영',
      profileImageUrl: '',
    },
    imageUrl: '',
  };

  return (
    <main style={{ padding: '24px', maxWidth: 400 }}>
      <Card card={mockCard} />
    </main>
  );
}
