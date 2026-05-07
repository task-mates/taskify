'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { cardsApi } from '@/src/apis/cards';
import { membersApi } from '@/src/apis/members';
import { columnsApi } from '@/src/apis/columns';
import type { Member } from '@/src/apis/members/type';
import type { Tag } from '@/src/types/tag';
import { getTagColorByName, TAG_PREVIEW_COLOR } from '@/src/utils/tagColor';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import { showToast } from '@/src/utils/toast';
import { emitCardChanged } from '@/src/utils/dashboardListEvent';
import * as S from './styles';
import UploadImage from '@/src/components/icons/icon-uploadimg.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';

registerLocale('ko', ko);

type TodoUpdateFormProps = {
  cardId: number;
  dashboardId: number;
  columnId: number;
  onSuccess: () => void;
  onValidChange?: (isValid: boolean) => void;
};

export const TODO_UPDATE_FORM_ID = 'todo-update-form';

export default function TodoUpdateForm({
  cardId,
  dashboardId,
  columnId,
  onSuccess,
  onValidChange,
}: TodoUpdateFormProps) {
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

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchUpdateFormData = async () => {
      try {
        const [card, memberData] = await Promise.all([
          cardsApi.getById(cardId),
          membersApi.getList(dashboardId),
        ]);

        const dashboardMembers = memberData.members;

        setMembers(dashboardMembers);
        setTitle(card.title);
        setDescription(card.description);
        onValidChange?.(!!card.title.trim() && !!card.description.trim());
        setDueDate(card.dueDate ? new Date(card.dueDate) : null);

        const initialTags = card.tags.map((tag) => ({
          name: tag,
          ...getTagColorByName(tag),
        }));

        setTags(initialTags);
        setTagOptions(initialTags);
        setPreviewImageUrl(card.imageUrl);

        const matchedMember = card.assignee
          ? dashboardMembers.find(
              (member) => member.userId === card.assignee?.id
            )
          : null;

        setSelectedAssignee(matchedMember ?? null);
      } catch {
        showToast.error('카드 정보 조회에 실패했습니다.');
      }
    };

    fetchUpdateFormData();
  }, [cardId, dashboardId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | null = previewImageUrl;

    if (selectedImageFile) {
      try {
        const uploadedImage = await columnsApi.uploadCardImage(
          columnId,
          selectedImageFile
        );
        imageUrl = uploadedImage.imageUrl;
      } catch {
        showToast.error('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    try {
      await cardsApi.update(cardId, {
        columnId,
        title,
        description,
        tags: tags.map((tag) => tag.name),
        dueDate: dueDate ? dayjs(dueDate).format('YYYY-MM-DD HH:mm') : null,
        assigneeUserId: selectedAssignee ? selectedAssignee.userId : null,
        imageUrl,
      });

      showToast.success('카드가 수정되었습니다.');
      emitCardChanged(dashboardId);
      onSuccess();
    } catch {
      showToast.error('카드 수정에 실패했습니다.');
    }
  };

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

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const handleClearAssignee = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedAssignee(null);
    setIsAssigneeOpen(false);
  };

  const selectedAssigneeBgColor = selectedAssignee
    ? getProfileColorByNickname(selectedAssignee.nickname)
    : '';

  const getAvatarText = (nickname: string) => {
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) return '';
    return trimmedNickname[0];
  };

  const handleAddTag = useCallback(
    (value = tagInput) => {
      const trimmedTag = value.trim();

      if (!trimmedTag) return;

      const existingOption = tagOptions.find((tag) => tag.name === trimmedTag);

      const newTag = existingOption ?? {
        name: trimmedTag,
        ...getTagColorByName(trimmedTag),
      };

      setTags((prev) =>
        prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
      );

      setTagOptions((prev) =>
        prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
      );

      setTagInput('');
      setIsTagOpen(true);
    },
    [tagInput, tagOptions]
  );

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

  useEffect(() => {
    return () => {
      if (previewImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

  const handleRemoveImage = () => {
    if (previewImageUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImageUrl);
    }

    setPreviewImageUrl(null);
    setSelectedImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <S.Form id={TODO_UPDATE_FORM_ID} onSubmit={handleSubmit}>
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
          onChange={(e) => {
            const newTitle = e.target.value;
            setTitle(newTitle);
            onValidChange?.(!!newTitle.trim() && !!description.trim());
          }}
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
          onChange={(e) => {
            const newDescription = e.target.value;
            setDescription(newDescription);
            onValidChange?.(!!title.trim() && !!newDescription.trim());
          }}
        />
      </S.Field>

      <S.Row>
        <S.Field>
          <S.Label htmlFor="dueDate">마감일</S.Label>
          <S.DatePickerWrapper $selected={!!dueDate}>
            <DatePicker
              id="dueDate"
              locale="ko"
              selected={dueDate}
              onChange={handleDateChange}
              showTimeSelect
              isClearable
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
                    $backgroundColor={selectedAssigneeBgColor}
                  >
                    {!selectedAssignee.profileImageUrl &&
                      getAvatarText(selectedAssignee.nickname)}
                  </S.AssigneeAvatar>
                  <S.AssigneeName>{selectedAssignee.nickname}</S.AssigneeName>
                  <S.AssigneeClearButton
                    role="button"
                    aria-label="담당자 선택 해제"
                    onClick={handleClearAssignee}
                  />
                </S.SelectedAssignee>
              ) : (
                '담당자 선택'
              )}
            </S.SelectButton>

            {isAssigneeOpen && (
              <S.SelectWrapper>
                <S.SelectList role="listbox">
                  {members.map((member) => {
                    const memberBgColor = getProfileColorByNickname(
                      member.nickname
                    );

                    return (
                      <S.OptionItem key={member.id}>
                        <S.OptionButton
                          type="button"
                          role="option"
                          onClick={() => {
                            setSelectedAssignee(member);
                            setIsAssigneeOpen(false);
                          }}
                        >
                          <S.AssigneeAvatar
                            $imageUrl={member.profileImageUrl}
                            $backgroundColor={memberBgColor}
                          >
                            {!member.profileImageUrl &&
                              getAvatarText(member.nickname)}
                          </S.AssigneeAvatar>
                          <S.AssigneeName>{member.nickname}</S.AssigneeName>
                        </S.OptionButton>
                      </S.OptionItem>
                    );
                  })}
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
                  x
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

                  <S.TagMoreButtonWrapper onClick={(e) => e.stopPropagation()}>
                    <S.TagMoreButton
                      type="button"
                      aria-label={`${tag.name} 태그 옵션 열기`}
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
                <S.TagCreateButton type="button" onClick={() => handleAddTag()}>
                  생성{' '}
                  <S.TagBadge
                    $backgroundColor={TAG_PREVIEW_COLOR.backgroundColor}
                    $color={TAG_PREVIEW_COLOR.color}
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
            <S.RemoveImageButton type="button" onClick={handleRemoveImage} />
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
  );
}
