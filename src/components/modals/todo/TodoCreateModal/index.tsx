'use client';

import { useState, useEffect, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { cardsApi } from '@/src/apis/cards';
import { columnsApi } from '@/src/apis/columns';
import { membersApi } from '@/src/apis/members';
import type { Member } from '@/src/apis/members/type';
import ModalActionButtons from '../common/ModalActionButtons';
import type { TodoCreateModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';
import UploadImage from '@/src/components/icons/icon-uploadimg.svg';

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

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagOptions, setTagOptions] = useState<string[]>([]);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagBoxRef = useRef<HTMLDivElement | null>(null);

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

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
      let imageUrl: string | undefined;

      if (selectedImageFile) {
        const uploadedImage = await columnsApi.uploadCardImage(
          columnId,
          selectedImageFile
        );

        imageUrl = uploadedImage.imageUrl;
      }

      await cardsApi.create({
        dashboardId,
        columnId,
        title,
        description,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        assigneeUserId: selectedAssignee?.userId,
        tags,
        imageUrl,
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
      if (tagBoxRef.current && !tagBoxRef.current.contains(e.target as Node)) {
        setIsTagOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddTag = (value = tagInput) => {
    const trimmedTag = value.trim();

    if (!trimmedTag) return;

    setTags((prev) =>
      prev.includes(trimmedTag) ? prev : [...prev, trimmedTag]
    );

    setTagOptions((prev) =>
      prev.includes(trimmedTag) ? prev : [...prev, trimmedTag]
    );

    setTagInput('');
    setIsTagOpen(true);
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag !== targetTag));
  };

  // const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.nativeEvent.isComposing) return;
  //   if (e.key !== 'Enter') return;

  //   e.preventDefault();
  //   handleAddTag();
  // };
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }

    if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const filteredTagOptions = tagInput.trim()
    ? tagOptions.filter((tag) => tag.includes(tagInput.trim()))
    : tagOptions;

  const shouldShowCreateOption =
    tagInput.trim() && !tags.includes(tagInput.trim());

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setSelectedImageFile(file);

    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }

    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleRemoveImage = () => {
    if (previewImageUrl) {
      URL.revokeObjectURL(previewImageUrl);
    }

    setPreviewImageUrl(null);
    setSelectedImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

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
          {/* <S.Input id="tag" type="text" placeholder="태그를 입력해주세요" /> */}
          <S.TagBox ref={tagBoxRef}>
            <S.TagInputArea onClick={() => setIsTagOpen(true)}>
              {tags.map((tag) => (
                <S.SelectedTagBadge key={tag}>
                  {tag}
                  <S.TagRemoveButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tag);
                    }}
                    aria-label={`${tag} 태그 삭제`}
                  >
                    ×
                  </S.TagRemoveButton>
                </S.SelectedTagBadge>
              ))}

              <S.TagInput
                id="tag"
                type="text"
                placeholder={tags.length === 0 ? '태그를 입력해주세요' : ''}
                value={tagInput}
                onFocus={() => setIsTagOpen(true)}
                onChange={(e) => {
                  setTagInput(e.target.value);
                  setIsTagOpen(true);
                }}
                onKeyDown={handleTagKeyDown}
              />
            </S.TagInputArea>

            {isTagOpen && (
              <S.TagOptionBox>
                <S.TagOptionTitle>옵션 선택 또는 생성</S.TagOptionTitle>

                {filteredTagOptions.map((tag) => (
                  <S.TagOptionButton
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                  >
                    <S.TagBadge>{tag}</S.TagBadge>
                  </S.TagOptionButton>
                ))}

                {shouldShowCreateOption && (
                  <S.TagCreateButton
                    type="button"
                    onClick={() => handleAddTag()}
                  >
                    생성 <S.TagBadge>{tagInput}</S.TagBadge>
                  </S.TagCreateButton>
                )}
              </S.TagOptionBox>
            )}
          </S.TagBox>
        </S.Field>

        <S.Field>
          <S.Label as="span">이미지</S.Label>
          {previewImageUrl ? (
            <S.PreviewImageBox>
              <S.PreviewImage
                src={previewImageUrl}
                alt="업로드 이미지 미리보기"
              />
              <S.RemoveImageButton
                type="button"
                onClick={handleRemoveImage}
              ></S.RemoveImageButton>
            </S.PreviewImageBox>
          ) : (
            <S.UploadLabel htmlFor="uploadfile">
              <S.UploadBox>
                <UploadImage />
                <S.UploadText>+ image upload</S.UploadText>
              </S.UploadBox>
            </S.UploadLabel>
          )}

          <S.HiddenInput
            ref={fileInputRef}
            id="uploadfile"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </S.Field>
      </S.Form>
    </TodoBaseModal>
  );
}
