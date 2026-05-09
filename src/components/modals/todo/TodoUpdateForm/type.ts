export interface TodoUpdateFormProps {
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
  onValidChange?: (isValid: boolean) => void;
}
