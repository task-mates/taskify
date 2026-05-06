'use client';

import { useState } from 'react';
import { Draggable, Droppable } from '@hello-pangea/dnd';
import * as S from './styles';
import Card from '../Card';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import ColumnSettingIcon from '@/src/components/icons/icon-column-setting.svg';
import ChevronDownIcon from '@/src/components/icons/icon-chevron-down.svg';
import ChevronUpIcon from '@/src/components/icons/icon-chevron-up.svg';

type ColumnSectionProps = {
  columnId: number;
  title: string;
  totalCount: number;
  cards: CardInfo[];
};

export default function ColumnSection({
  columnId,
  title,
  totalCount,
  cards,
}: ColumnSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const droppableId = String(columnId);

  return (
    <S.Section>
      <S.Header>
        <S.TitleGroup>
          <S.Title>{title}</S.Title>
          <S.Count>{totalCount}</S.Count>
        </S.TitleGroup>
        <S.Setting>
          <ColumnSettingIcon aria-hidden="true" />
          <S.ArrowButton
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? '접기' : '펼치기'}
            type="button"
          >
            {isOpen ? (
              <ChevronUpIcon width={24} height={24} aria-hidden="true" />
            ) : (
              <ChevronDownIcon width={24} height={24} aria-hidden="true" />
            )}
          </S.ArrowButton>
        </S.Setting>
      </S.Header>

      <S.AddButton type="button">
        <S.IconContainer>
          <PlusIcon aria-hidden="true" />
        </S.IconContainer>
      </S.AddButton>

      <Droppable droppableId={droppableId}>
        {(provided) => (
          <S.CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
            $isOpen={isOpen}
          >
            {cards.length === 0 ? (
              <S.Empty>카드가 없습니다.</S.Empty>
            ) : (
              cards.map((card, index) => (
                <Draggable
                  key={card.id}
                  draggableId={String(card.id)}
                  index={index}
                  isDragDisabled={!isOpen}
                >
                  {(dragProvided, snapshot) => (
                    <S.DraggableWrap
                      ref={dragProvided.innerRef}
                      {...dragProvided.draggableProps}
                      {...dragProvided.dragHandleProps}
                      $isDragging={snapshot.isDragging}
                    >
                      <Card card={card} />
                    </S.DraggableWrap>
                  )}
                </Draggable>
              ))
            )}
            {provided.placeholder}
          </S.CardList>
        )}
      </Droppable>
    </S.Section>
  );
}
