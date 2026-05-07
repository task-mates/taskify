'use client';

import { useState } from 'react';
import * as S from './styles';
import type { CardProps } from './type';
import TodoCardModal from '@/src/components/modals/todo/TodoCardModal';

export default function Card({ card, dashboardId, columnTitle }: CardProps) {
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  return (
    <>
      <S.Card
        onClick={() => setIsCardModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsCardModalOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
      >
        {card.imageUrl && <S.Thumbnail src={card.imageUrl} alt={card.title} />}
        <S.Content>
          <S.Title>{card.title}</S.Title>
          <S.TagList>
            {card.tags?.map((tag) => (
              <S.Tag key={tag}>{tag}</S.Tag>
            ))}
          </S.TagList>

          <S.DueDate>{card.dueDate ?? '지정된 마감일 없음'}</S.DueDate>

          {card.assignee && (
            <S.Assignee>
              {card.assignee.profileImageUrl ? (
                <S.ProfileImage
                  src={card.assignee.profileImageUrl}
                  alt={card.assignee.nickname}
                />
              ) : (
                <S.ProfileFallback>
                  {card.assignee.nickname.slice(0, 2)}
                </S.ProfileFallback>
              )}
            </S.Assignee>
          )}
        </S.Content>
      </S.Card>

      {isCardModalOpen && (
        <TodoCardModal
          onClose={() => setIsCardModalOpen(false)}
          cardId={card.id}
          dashboardId={dashboardId}
          columnTitle={columnTitle}
        />
      )}
    </>
  );
}
