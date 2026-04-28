'use client';

import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cardsApi } from '@/src/apis/cards';
import { membersApi } from '@/src/apis/members';
import type { Member } from '@/src/apis/members/type';
import ModalActionButtons from '../common/ModalActionButtons';
import type { TodoCreateModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';

const TODO_CREATE_FORM_ID = 'todo-create-form';

export default function TodoCreateModal({
  onClose,
  dashboardId,
  columnId,
}: TodoCreateModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Member | null>(null);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  const footerGroup = (
    <ModalActionButtons
      onCancel={onClose}
      submitText="생성"
      formId={TODO_CREATE_FORM_ID}
    />
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await cardsApi.create({
        dashboardId,
        columnId,
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        assigneeUserId: selectedAssignee?.userId,
        tags: [],
      });

      onClose();
    } catch (error) {
      console.error('카드 생성 실패:', error);
      alert('카드 생성에 실패했습니다.');
    }
  };

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const data = await membersApi.getList(dashboardId);
        setMembers(data.members);
      } catch (error) {
        console.error('멤버 목록 조회 실패:', error);
      }
    };
    fetchMembers();
  }, [dashboardId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(e.target as Node)
      ) {
        setIsAssigneeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <TodoBaseModal
      onClose={onClose}
      title="Title"
      labelId="할 일 생성 모달"
      footerGroup={footerGroup}
    >
      <S.Form id={TODO_CREATE_FORM_ID} onSubmit={handleSubmit}>
        <S.Field>
          <S.Label htmlFor="title" $required>
            제목
          </S.Label>
          <S.Input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </S.Field>

        <S.Field>
          <S.Label htmlFor="description" $required>
            설명
          </S.Label>
          <S.Textarea
            id="description"
            placeholder="설명을 입력해주세요"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </S.Field>

        <S.Row>
          <S.Field>
            <S.Label htmlFor="dueDate">마감일</S.Label>
            <S.DatePickerWrapper>
              <DatePicker
                id="dueDate"
                selected={dueDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat="yyyy. MM. dd HH:mm"
                placeholderText="날짜를 입력해 주세요"
                customInput={<S.DateInput />}
              />
            </S.DatePickerWrapper>
          </S.Field>

          <S.Field>
            <S.Label htmlFor="assignee">담당자</S.Label>
            <S.SelectBox ref={selectBoxRef}>
              <S.SelectButton
                id="assignee"
                type="button"
                onClick={() => setIsAssigneeOpen((prev) => !prev)}
                $selected={!!selectedAssignee}
                $open={isAssigneeOpen}
              >
                {/* {selectedAssignee ? selectedAssignee.nickname : '담당자 선택'} */}
                {selectedAssignee ? (
                  <S.SelectedAssignee>
                    <S.AssigneeAvatar
                      $imageUrl={selectedAssignee.profileImageUrl}
                    >
                      {!selectedAssignee.profileImageUrl &&
                        selectedAssignee.nickname.slice(0, 2)}
                    </S.AssigneeAvatar>
                    <S.AssigneeName>{selectedAssignee.nickname}</S.AssigneeName>
                  </S.SelectedAssignee>
                ) : (
                  '담당자 선택'
                )}
              </S.SelectButton>

              {isAssigneeOpen && (
                <S.SelectWrapper>
                  <S.SelectList role="listbox">
                    {members.map((member) => (
                      <S.OptionItem key={member.id}>
                        <S.OptionButton
                          type="button"
                          role="option"
                          onClick={() => {
                            setSelectedAssignee(member);
                            setIsAssigneeOpen(false);
                          }}
                        >
                          {/* {member.nickname} */}
                          <S.AssigneeAvatar $imageUrl={member.profileImageUrl}>
                            {!member.profileImageUrl && member.nickname}
                          </S.AssigneeAvatar>
                          <S.AssigneeName>{member.nickname}</S.AssigneeName>
                        </S.OptionButton>
                      </S.OptionItem>
                    ))}
                  </S.SelectList>
                </S.SelectWrapper>
              )}
            </S.SelectBox>
          </S.Field>
        </S.Row>

        <S.Field>
          <S.Label htmlFor="tag">태그</S.Label>
          <S.Input id="tag" type="text" placeholder="태그를 입력해주세요" />
        </S.Field>

        <S.Field>
          <S.Label>이미지</S.Label>
          <S.UploadLabel htmlFor="uploadfile">
            <S.UploadBox>
              <S.UploadText>+ image upload</S.UploadText>
            </S.UploadBox>
          </S.UploadLabel>
          <S.HiddenInput id="uploadfile" type="file" />
        </S.Field>
      </S.Form>
    </TodoBaseModal>
  );
}
