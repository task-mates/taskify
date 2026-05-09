'use client';

import { useEffect } from 'react';
import { cardsApi } from '@/src/apis/cards';
import { membersApi } from '@/src/apis/members';
import { useTodoForm } from '@/src/hooks/useTodoForm';
import { getTagColorByName } from '@/src/utils/tagColor';
import { showToast } from '@/src/utils/toast';
import { emitCardChanged } from '@/src/utils/dashboardListEvent';
import TodoFormFields from '../common/TodoFormFields';
import * as S from './styles';
import { TodoUpdateFormProps } from './type';

export const TODO_UPDATE_FORM_ID = 'todo-update-form';

export default function TodoUpdateForm({
  cardId,
  dashboardId,
  columnId,
  onSuccess,
}: TodoUpdateFormProps) {
  const form = useTodoForm({
    columnId,
    onSubmit: async (data) => {
      try {
        await cardsApi.update(cardId, {
          ...data,
          columnId,
          tags: data.tags.map((tag) => tag.name),
          assigneeUserId: data.selectedAssignee
            ? data.selectedAssignee.userId
            : null,
        });

        showToast.success('카드가 수정되었습니다.');
        emitCardChanged(dashboardId);
        onSuccess();
      } catch {
        showToast.error('카드 수정에 실패했습니다.');
      }
    },
  });

  useEffect(() => {
    const fetchUpdateFormData = async () => {
      try {
        const [card, memberData] = await Promise.all([
          cardsApi.getById(cardId),
          membersApi.getList(dashboardId),
        ]);

        const dashboardMembers = memberData.members;

        const initialTags = card.tags.map((tag) => ({
          name: tag,
          ...getTagColorByName(tag),
        }));

        const matchedMember = card.assignee
          ? dashboardMembers.find(
              (member) => member.userId === card.assignee?.id
            )
          : null;

        form.setMembers(dashboardMembers);
        form.setTitle(card.title);
        form.setDescription(card.description);
        form.setDueDate(card.dueDate ? new Date(card.dueDate) : null);

        form.setTags(initialTags);
        form.setTagOptions(initialTags);
        form.setPreviewImageUrl(card.imageUrl);

        form.setSelectedAssignee(matchedMember ?? null);
      } catch {
        showToast.error('카드 정보 조회에 실패했습니다.');
      }
    };

    fetchUpdateFormData();
  }, [cardId, dashboardId]);

  return (
    <S.Form id={TODO_UPDATE_FORM_ID} onSubmit={form.handleSubmit}>
      <TodoFormFields {...form} />
    </S.Form>
  );
}
