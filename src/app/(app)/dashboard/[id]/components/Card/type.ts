import type { Card as CardInfo } from '@/src/apis/cards/type';

export type CardProps = {
  card: CardInfo;
  dashboardId: number;
  columnTitle: string;
};
