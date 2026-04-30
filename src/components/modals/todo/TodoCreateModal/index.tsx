'use client';

import axios from 'axios';
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
import DeleteIcon from '@/src/components/icons/icon-delete.svg';

type TagColor = {
  backgroundColor: string;
  color: string;
};

type Tag = {
  name: string;
  backgroundColor: string;
  color: string;
};

const TAG_COLORS = [
  { backgroundColor: '#F2F2F2', color: '#666666' }, // 회색
  { backgroundColor: '#F4E3D7', color: '#8A4B2A' }, // 갈색
  { backgroundColor: '#FADFCB', color: '#B85C2E' }, // 주황색
  { backgroundColor: '#F8E7B8', color: '#A36A00' }, // 노란색
  { backgroundColor: '#DDEFE3', color: '#2F6F4E' }, // 초록색
  { backgroundColor: '#D8ECFF', color: '#2D6FA3' }, // 파란색
  { backgroundColor: '#E7DDF7', color: '#6E4BA3' }, // 보라색
  { backgroundColor: '#F7DDE8', color: '#A33E68' }, // 분홍색
  { backgroundColor: '#F9D9D6', color: '#B84038' }, // 빨간색
];

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
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagBoxRef = useRef<HTMLDivElement | null>(null);
  const [openedTagMenu, setOpenedTagMenu] = useState<string | null>(null);
  const [previewTagColor, setPreviewTagColor] = useState<TagColor | null>(null);
  const currentInputColorRef = useRef<TagColor | null>(null);
  const lastTagColorRef = useRef<TagColor | null>(null);

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

    let imageUrl: string | undefined;

    try {
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
        // dueDate: dueDate ? dueDate.toISOString() : undefined,
        dueDate: dueDate
          ? `${dueDate.getFullYear()}-${String(dueDate.getMonth() + 1).padStart(2, '0')}-${String(dueDate.getDate()).padStart(2, '0')} ${String(dueDate.getHours()).padStart(2, '0')}:${String(dueDate.getMinutes()).padStart(2, '0')}`
          : '',
        assigneeUserId: selectedAssignee?.userId,
        tags: tags.map((tag) => tag.name),
      });

      onClose();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('요청 body:', {
          dashboardId,
          columnId,
          title,
          description,
          dueDate: dueDate ? dueDate.toISOString() : '',
          assigneeUserId: selectedAssignee?.id,
          tags: tags.map((tag) => tag.name),
          imageUrl: imageUrl ?? '',
        });

        console.log('서버 에러 응답:', error.response?.data);
        console.log('상태 코드:', error.response?.status);
      }
      // console.error('카드 생성 실패:', error);
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

      if (tagBoxRef.current && !tagBoxRef.current.contains(e.target as Node)) {
        setIsTagOpen(false);
        setOpenedTagMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getRandomTagColor = (excludeColor?: TagColor | null) => {
    const availableColors = excludeColor
      ? TAG_COLORS.filter(
          (tagColor) =>
            tagColor.backgroundColor !== excludeColor.backgroundColor ||
            tagColor.color !== excludeColor.color
        )
      : TAG_COLORS;

    const randomIndex = Math.floor(Math.random() * availableColors.length);
    return availableColors[randomIndex];
  };

  const handleAddTag = (value = tagInput) => {
    const trimmedTag = value.trim();

    if (!trimmedTag) return;

    const existingOption = tagOptions.find((tag) => tag.name === trimmedTag);

    const tagColor =
      currentInputColorRef.current ??
      getRandomTagColor(lastTagColorRef.current);

    const newTag = existingOption ?? {
      name: trimmedTag,
      ...tagColor,
    };

    setTags((prev) =>
      prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
    );

    setTagOptions((prev) =>
      prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
    );

    lastTagColorRef.current = {
      backgroundColor: newTag.backgroundColor,
      color: newTag.color,
    };

    currentInputColorRef.current = null;
    setPreviewTagColor(null);
    setTagInput('');
    setIsTagOpen(true);
  };

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
  };

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
    ? tagOptions.filter((tag) => tag.name.includes(tagInput.trim()))
    : tagOptions;

  const shouldShowCreateOption =
    tagInput.trim() && !tagOptions.some((tag) => tag.name === tagInput.trim());

  const handleDeleteTagOption = (targetTag: string) => {
    setTagOptions((prev) => prev.filter((tag) => tag.name !== targetTag));
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
    setOpenedTagMenu(null);
  };

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
          <S.TagBox
            ref={tagBoxRef}
            onClick={() => {
              if (openedTagMenu) {
                setOpenedTagMenu(null);
              }
            }}
          >
            <S.TagInputArea
              onClick={() => {
                if (openedTagMenu) {
                  setOpenedTagMenu(null);
                }

                setIsTagOpen(true);
              }}
            >
              {tags.map((tag) => (
                <S.SelectedTagBadge
                  key={tag.name}
                  $backgroundColor={tag.backgroundColor}
                  $color={tag.color}
                >
                  {tag.name}
                  <S.TagRemoveButton
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveTag(tag.name);
                    }}
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
                  const nextValue = e.target.value;

                  if (!nextValue) {
                    currentInputColorRef.current = null;
                    setPreviewTagColor(null);
                    setTagInput('');
                    setIsTagOpen(true);
                    return;
                  }

                  if (!currentInputColorRef.current) {
                    const nextColor = getRandomTagColor(
                      lastTagColorRef.current
                    );

                    currentInputColorRef.current = nextColor;
                    setPreviewTagColor(nextColor);
                  }

                  setTagInput(nextValue);
                  setIsTagOpen(true);
                }}
                onKeyDown={handleTagKeyDown}
              />
            </S.TagInputArea>

            {isTagOpen && (
              <S.TagOptionBox>
                <S.TagOptionTitle>옵션 선택 또는 생성</S.TagOptionTitle>

                {filteredTagOptions.map((tag) => (
                  <S.TagOptionItem
                    key={tag.name}
                    $isMenuOpen={openedTagMenu === tag.name}
                    $hasOpenedMenu={!!openedTagMenu}
                    onClick={() => {
                      if (openedTagMenu) {
                        setOpenedTagMenu(null);
                      }
                    }}
                  >
                    <S.TagOptionButton
                      type="button"
                      $hasOpenedMenu={!!openedTagMenu}
                      onClick={(e) => {
                        if (openedTagMenu) {
                          setOpenedTagMenu(null);
                          return;
                        }
                        e.stopPropagation();
                        handleAddTag(tag.name);
                      }}
                    >
                      <S.TagBadge
                        $backgroundColor={tag.backgroundColor}
                        $color={tag.color}
                      >
                        {tag.name}
                      </S.TagBadge>
                    </S.TagOptionButton>

                    <S.TagMoreButtonWrapper
                      onClick={(e) => e.stopPropagation()}
                    >
                      <S.TagMoreButton
                        type="button"
                        aria-label={`${tag} 태그 옵션 열기`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenedTagMenu((prev) =>
                            prev === tag.name ? null : tag.name
                          );
                        }}
                      >
                        ⋯
                      </S.TagMoreButton>

                      {openedTagMenu === tag.name && (
                        <S.TagDeletePopup>
                          <S.TagDeleteButton
                            type="button"
                            onClick={() => {
                              handleDeleteTagOption(tag.name);
                            }}
                          >
                            <DeleteIcon />
                            삭제
                          </S.TagDeleteButton>
                        </S.TagDeletePopup>
                      )}
                    </S.TagMoreButtonWrapper>
                  </S.TagOptionItem>
                ))}

                {shouldShowCreateOption && (
                  <S.TagCreateButton
                    type="button"
                    onClick={() => handleAddTag()}
                  >
                    생성{' '}
                    <S.TagBadge
                      $backgroundColor={
                        previewTagColor?.backgroundColor ??
                        TAG_COLORS[0].backgroundColor
                      }
                      $color={previewTagColor?.color ?? TAG_COLORS[0].color}
                    >
                      {tagInput}
                    </S.TagBadge>
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
