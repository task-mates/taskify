type Assignee = {
  profileImageUrl: string;
  nickname: string;
  id: number;
};

export type CardData = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: Assignee;
  imageUrl: string;
};

export type CardProps = {
  card: CardData;
};
