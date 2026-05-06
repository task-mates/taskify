import type { DropResult } from '@hello-pangea/dnd';
import type { Card as CardInfo } from '@/src/apis/cards/type';

export type ColumnWithCards = {
  columnId: number;
  title: string;
  totalCount: number;
  cards: CardInfo[];
};

export function applyDragResult(
  columns: ColumnWithCards[],
  result: DropResult
): ColumnWithCards[] | null {
  const { destination, source, draggableId } = result;
  if (!destination) return null;
  if (
    destination.droppableId === source.droppableId &&
    destination.index === source.index
  ) {
    return null;
  }

  const sourceId = Number(source.droppableId);
  const destId = Number(destination.droppableId);
  const cardId = Number(draggableId);
  if (Number.isNaN(cardId)) return null;

  const next = columns.map((col) => ({
    ...col,
    cards: [...col.cards],
  }));

  const sourceCol = next.find((c) => c.columnId === sourceId);
  const destCol = next.find((c) => c.columnId === destId);
  if (!sourceCol || !destCol) return null;

  const moving = sourceCol.cards[source.index];
  if (!moving || moving.id !== cardId) return null;

  if (sourceId === destId) {
    const items = [...sourceCol.cards];
    const [removed] = items.splice(source.index, 1);
    items.splice(destination.index, 0, removed);
    sourceCol.cards = items;
    return next;
  }

  sourceCol.cards.splice(source.index, 1);
  destCol.cards.splice(destination.index, 0, {
    ...moving,
    columnId: destId,
  });
  sourceCol.totalCount = Math.max(0, sourceCol.totalCount - 1);
  destCol.totalCount = destCol.totalCount + 1;

  return next;
}
