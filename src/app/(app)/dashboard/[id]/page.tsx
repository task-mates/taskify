'use client';

import { useEffect, useState } from 'react';
import Card from './components/Card';
import { cardsApi } from '@/src/apis/cards';
import type { Card as CardType } from '@/src/apis/cards/type';

export default function DashboardPage() {
  const [cards, setCards] = useState<CardType[]>([]);

  useEffect(() => {
    cardsApi.getList({ columnId: 60868, size: 20 }).then((res) => {
      setCards(res.cards);
    });
  }, []);

  if (cards.length === 0) {
    return <main style={{ padding: '24px' }}>카드가 없습니다.</main>;
  }

  return (
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
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
    </main>
  );
}
