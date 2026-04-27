'use client';

import * as S from './styles';
import type { CardProps } from './type';

export default function Card({ card }: CardProps) {
  return (
    <S.Card>
      {card.imageUrl && <S.Thumbnail src={card.imageUrl} alt={card.title} />}

      <S.Content>
        <S.Title>{card.title}</S.Title>
        <S.TagList>
          {card.tags.map((tag) => (
            <S.Tag key={tag}>{tag}</S.Tag>
          ))}
        </S.TagList>

        <S.DueDate>{card.dueDate ?? '지정된 마감일 없음'}</S.DueDate>

        <S.Assignee>
          {card.assignee?.profileImageUrl ? (
            <S.ProfileImage
              src={card.assignee.profileImageUrl}
              alt={card.assignee.nickname}
            />
          ) : (
            <S.ProfileFallback>
              {(card.assignee?.nickname ?? '없음').slice(0, 2)}
            </S.ProfileFallback>
          )}
        </S.Assignee>
      </S.Content>
    </S.Card>
  );
}
