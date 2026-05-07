'use client';

import { useState } from 'react';
import ModalActionButtons from '../common/ModalActionButtons';
import TodoBaseModal from '../common/TodoBaseModal';
import TodoUpdateForm, { TODO_UPDATE_FORM_ID } from '../TodoUpdateForm';
import type { TodoUpdateModalProps } from './type';

export default function TodoUpdateModal({
  onClose,
  dashboardId,
  columnId,
  cardId,
}: TodoUpdateModalProps) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const footerGroup = (
    <ModalActionButtons
      onCancel={onClose}
      submitText="수정"
      formId={TODO_UPDATE_FORM_ID}
      submitDisabled={isSubmitDisabled}
    />
  );

  return (
    <TodoBaseModal
      onClose={onClose}
      title="할 일 수정"
      labelId="할 일 수정 모달"
      footerGroup={footerGroup}
    >
      <TodoUpdateForm
        cardId={cardId}
        dashboardId={dashboardId}
        columnId={columnId}
        onSuccess={onClose}
        onValidChange={(isValid) => setIsSubmitDisabled(!isValid)}
      />
    </TodoBaseModal>
  );
}
