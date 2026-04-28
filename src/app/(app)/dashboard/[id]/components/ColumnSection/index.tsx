import * as S from '.';
import Card from '../Card';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';

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
  return (
    <S.Section>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.Count>{totalCount}</S.Count>
      </S.Header>

      <S.AddButton>
        <S.IconContainer>
          <PlusIcon aria-hidden="true" />
        </S.IconContainer>
      </S.AddButton>

      <S.CardList>
        {cards.length === 0 ? (
          <S.Empty>카드가 없습니다.</S.Empty>
        ) : (
          cards.map((card) => <Card key={card.id} card={card} />)
        )}
      </S.CardList>
    </S.Section>
  );
}

import styled from 'styled-components';

export const Section = styled.section`
  min-width: 320px;
  height: 100%;
  padding: 16px;
  border-radius: 16px;
  // background: #e1eaf1;
  border: 1px solid;

  display: flex;
  flex-direction: column;
  gap: 12px;

  overflow: auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: #333236;
`;

export const Count = styled.span`
  min-width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #333236;
  font-size: 12px;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
`;

export const CardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  flex: 1;
  min-height: 0;
  overflow-y: auto;
`;

export const Empty = styled.p`
  margin: 0;
  font-size: 14px;
  color: #6b7280;
  text-align: center;
`;

export const AddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
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
