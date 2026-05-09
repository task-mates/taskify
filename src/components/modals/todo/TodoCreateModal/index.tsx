'use client';

import { useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { cardsApi } from '@/src/apis/cards';
import { membersApi } from '@/src/apis/members';
import { useTodoForm } from '@/src/hooks/useTodoForm';
import { emitCardChanged } from '@/src/utils/dashboardListEvent';
import { showToast } from '@/src/utils/toast';
import ModalActionButtons from '../common/ModalActionButtons';
import TodoBaseModal from '../common/TodoBaseModal';
import TodoFormFields from '../common/TodoFormFields';
import type { TodoCreateModalProps } from './type';
import * as S from './styles';

const TODO_CREATE_FORM_ID = 'todo-create-form';

export default function TodoCreateModal({
  onClose,
  onCreated,
  dashboardId,
  columnId,
}: TodoCreateModalProps) {
  const form = useTodoForm({
    columnId,
    onSubmit: async (data) => {
      try {
        await cardsApi.create({
          dashboardId,
          columnId,
          title: data.title,
          description: data.description,
          tags: data.tags.map((tag) => tag.name),
          ...(data.dueDate && { dueDate: data.dueDate }),
          ...(data.selectedAssignee && {
            assigneeUserId: data.selectedAssignee.userId,
          }),
          ...(data.imageUrl && { imageUrl: data.imageUrl }),
        });

        showToast.success('카드가 생성되었습니다.');
        emitCardChanged(dashboardId);
        onCreated?.();
        onClose();
      } catch {
        showToast.error('카드 생성에 실패했습니다.');
      }
    },
  });

  const isSubmitDisabled = !form.title.trim() || !form.description.trim();

  const footerGroup = (
    <ModalActionButtons
      onCancel={onClose}
      submitText="생성"
      formId={TODO_CREATE_FORM_ID}
      submitDisabled={isSubmitDisabled}
    />
  );

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.getList(dashboardId);
        form.setMembers(data.members);
      } catch {
        showToast.error('담당자 목록 조회에 실패했습니다.');
      }
    };

    fetchMembers();
  }, [dashboardId]);

  return (
    <TodoBaseModal
      onClose={onClose}
      title="할 일 생성"
      labelId="할 일 생성 모달"
      footerGroup={footerGroup}
    >
      <S.Form id={TODO_CREATE_FORM_ID} onSubmit={form.handleSubmit}>
        <TodoFormFields {...form} />
      </S.Form>
    </TodoBaseModal>
  );
}
