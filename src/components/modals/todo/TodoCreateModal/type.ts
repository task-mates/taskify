export type TagColor = {
  backgroundColor: string;
  color: string;
};

export type Tag = {
  name: string;
  backgroundColor: string;
  color: string;
};

export interface TodoCreateModalProps {
  onClose: () => void;
  dashboardId: number;
  columnId: number;
}
