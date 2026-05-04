'use client';

import { useState } from 'react';
import * as S from './styles';
import Card from '../Card';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import SettingIcon from '@/src/components/icons/icon-setting.svg';

type ColumnSectionProps = {
  title: string;
  totalCount: number;
  cards: CardInfo[];
};

export default function ColumnSection({
  title,
  totalCount,
  cards,
}: ColumnSectionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <S.Section>
      <S.Header onClick={() => setIsOpen((prev) => !prev)}>
        <S.TitleGroup>
          <S.Title>{title}</S.Title>
          <S.Count>{totalCount}</S.Count>
        </S.TitleGroup>
        <S.Setting>
          <SettingIcon aria-hidden="true" />
          <S.ArrowButton
            $isOpen={isOpen}
            aria-label={isOpen ? '접기' : '펼치기'}
          >
            ▼
          </S.ArrowButton>
        </S.Setting>
      </S.Header>

      <S.CardList $isOpen={isOpen}>
        <S.AddButton>
          <S.IconContainer>
            <PlusIcon aria-hidden="true" />
          </S.IconContainer>
        </S.AddButton>
        {cards.length === 0 ? (
          <S.Empty>카드가 없습니다.</S.Empty>
        ) : (
          cards.map((card) => <Card key={card.id} card={card} />)
        )}
      </S.CardList>
    </S.Section>
  );
}
