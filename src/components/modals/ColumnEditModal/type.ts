export interface ColumnEditModalProps {
  columnId: number;
  currentTitle: string;
  onClose: () => void;
  onEdited?: () => void;
}
