'use client';

import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import DatePicker, { registerLocale } from 'react-datepicker';
import { ko } from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';
import { cardsApi } from '@/src/apis/cards';
import { membersApi } from '@/src/apis/members';
import { columnsApi } from '@/src/apis/columns';
import type { Member } from '@/src/apis/members/type';
import ModalActionButtons from '../common/ModalActionButtons';
import type { Tag, TagColor, TodoUpdateModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';
import UploadImage from '@/src/components/icons/icon-uploadimg.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';

registerLocale('ko', ko);

// ==============================
// 담당자 닉네임 색상 팔레트
// ==============================
const ASSIGNEE_AVATAR_COLORS = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#FF9800',
  '#FF5722',
];

// ==============================
// 태그 색상 팔레트
// ==============================
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

// 태그 색상 선택 로직
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

// 폼 연결용 ID
const TODO_UPDATE_FORM_ID = 'todo-update-form';

export default function TodoUpdateModal({
  onClose,
  dashboardId,
  columnId,
  cardId,
}: TodoUpdateModalProps) {
  // ==============================
  // 기본 입력 상태 (제목, 설명, 마감일)
  // ==============================
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  // ==============================
  // 담당자 상태 (멤버 목록, 드롭다운, 선택된 담당자)
  // ==============================
  const [members, setMembers] = useState<Member[]>([]);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Member | null>(null);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  // ==============================
  // 태그 상태 (입력값, 선택된 태그, 옵션 목록)
  // ==============================
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  // ==============================
  // 태그 UI 상태 (옵션 박스, 더보기 메뉴, 색상 미리보기)
  // ==============================
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagBoxRef = useRef<HTMLDivElement | null>(null);
  const [openedTagMenu, setOpenedTagMenu] = useState<string | null>(null);
  const [previewTagColor, setPreviewTagColor] = useState<TagColor | null>(null);
  const currentInputColorRef = useRef<TagColor | null>(null);
  const lastTagColorRef = useRef<TagColor | null>(null);

  // ==============================
  // 이미지 업로드 상태 (미리보기 URL, 실제 선택 파일)
  // ==============================
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  // ==============================
  // 모달 하단 버튼 영역
  // ==============================
  const footerGroup = (
    <ModalActionButtons
      onCancel={onClose}
      submitText="수정"
      formId={TODO_UPDATE_FORM_ID}
    />
  );

  // ==============================
  // 기존 카드 정보 불러와서 input 기본값 채우기
  // ==============================
  useEffect(() => {
    const fetchUpdateModalData = async () => {
      try {
        const [card, memberData] = await Promise.all([
          cardsApi.getById(cardId),
          membersApi.getList(dashboardId),
        ]);

        const dashboardMembers = memberData.members;

        setMembers(dashboardMembers);
        setTitle(card.title);
        setDescription(card.description);
        setDueDate(card.dueDate ? new Date(card.dueDate) : null);

        const initialTags = card.tags.map((tag) => ({
          name: tag,
          ...getRandomTagColor(),
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
      } catch (error) {
        console.error('수정 모달 데이터 조회 실패:', error);
      }
    };

    fetchUpdateModalData();
  }, [cardId, dashboardId]);

  // ==============================
  // 카드 수정 제출 로직
  // ==============================
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | null = previewImageUrl;

    try {
      if (selectedImageFile) {
        const uploadedImage = await columnsApi.uploadCardImage(
          columnId,
          selectedImageFile
        );

        imageUrl = uploadedImage.imageUrl;
      }

      const requestBody = {
        columnId,
        title,
        description,
        dueDate: dueDate ? dayjs(dueDate).format('YYYY-MM-DD HH:mm') : '',
        assigneeUserId: selectedAssignee?.userId,
        tags: tags.map((tag) => tag.name),
        imageUrl,
      };

      console.log('카드 수정 요청 body:', requestBody);

      await cardsApi.update(cardId, requestBody);

      onClose(); //추후 토스트로 대체하면 좋을 것 같음
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('요청 body:', {
          dashboardId,
          columnId,
          title,
          description,
          dueDate: dueDate ? dueDate.toISOString() : '',
          assigneeUserId: selectedAssignee?.userId,
          tags: tags.map((tag) => tag.name),
          imageUrl: imageUrl ?? '',
        });

        console.log('서버 에러 응답:', error.response?.data);
        console.log('상태 코드:', error.response?.status);
      }
      // console.error('카드 수정 실패:', error);
      alert('카드 수정에 실패했습니다.');
    }
  };

  // ==============================
  // 드롭다운 바깥 클릭 시 닫기 로직
  // ==============================
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

  // ==============================
  // 마감일 선택 로직
  // ==============================
  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  // ==============================
  // 담당자 관련 로직
  // ==============================

  // 담당자 선택 해제 로직
  const handleClearAssignee = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedAssignee(null);
    setIsAssigneeOpen(false);
  };

  // 담당자 아바타 색상 생성 로직
  const getHashFromString = (value: string) => {
    let hash = 0;
    for (let i = 0; i < value.length; i += 1) {
      hash = value.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash);
  };

  const getAssigneeAvatarColor = (member: Member) => {
    const hashKey = `${member.userId ?? member.id}-${member.nickname}`;
    const hash = getHashFromString(hashKey);
    return ASSIGNEE_AVATAR_COLORS[hash % ASSIGNEE_AVATAR_COLORS.length];
  };

  const selectedAssigneeBgColor = selectedAssignee
    ? getAssigneeAvatarColor(selectedAssignee)
    : '';

  // 담당자 아바타 텍스트 생성 로직
  const getAvatarText = (nickname: string) => {
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) return '';
    const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(trimmedNickname);
    return isKorean ? trimmedNickname.slice(1, 3) : trimmedNickname.slice(0, 1);
  };

  // ==============================
  // 태그 관련 로직
  // ==============================

  // 태그 추가 로직
  // 태그 추가 로직
  const handleAddTag = useCallback(
    (value = tagInput) => {
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
    },
    [
      tagInput,
      tagOptions,
      setTags,
      setTagOptions,
      setPreviewTagColor,
      setTagInput,
      setIsTagOpen,
    ]
  );

  // 선택된 태그 제거 로직
  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
  };

  // 태그 입력 키보드 처리 로직
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

  // 태그 옵션 필터링 로직
  const filteredTagOptions = tagInput.trim()
    ? tagOptions.filter((tag) => tag.name.includes(tagInput.trim()))
    : tagOptions;

  const shouldShowCreateOption =
    tagInput.trim() && !tagOptions.some((tag) => tag.name === tagInput.trim());

  // 태그 옵션 삭제 로직
  const handleDeleteTagOption = (targetTag: string) => {
    setTagOptions((prev) => prev.filter((tag) => tag.name !== targetTag));
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
    setOpenedTagMenu(null);
  };

  // ==============================
  // 이미지 관련 로직
  // ==============================
  // 이미지 미리보기 URL cleanup 로직
  useEffect(() => {
    return () => {
      if (previewImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // 이미지 선택 및 미리보기 생성 로직
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedImageFile(file);
    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

  // 이미지 제거 로직
  const fileInputRef = useRef<HTMLInputElement | null>(null);
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

  // ==============================
  // 렌더링
  // ==============================
  return (
    <TodoBaseModal
      onClose={onClose}
      title="할 일 수정"
      labelId="할 일 수정 모달"
      footerGroup={footerGroup}
    >
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
                    ></S.AssigneeClearButton>
                  </S.SelectedAssignee>
                ) : (
                  '담당자 선택'
                )}
              </S.SelectButton>

              {isAssigneeOpen && (
                <S.SelectWrapper>
                  <S.SelectList role="listbox">
                    {members.map((member) => {
                      const memberBgColor = getAssigneeAvatarColor(member);
                      return (
                        <S.OptionItem key={member.id}>
                          <S.OptionButton
                            type="button"
                            role="option"
                            onClick={() => {
                              // console.log('선택한 담당자:', member);

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
