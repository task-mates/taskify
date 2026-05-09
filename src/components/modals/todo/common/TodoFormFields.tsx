import { useTodoForm } from '@/src/hooks/useTodoForm';
import DatePicker, { registerLocale } from 'react-datepicker';
import * as S from './styles';
import UploadImage from '@/src/components/icons/icon-uploadimg.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';
import { TAG_PREVIEW_COLOR } from '@/src/utils/tagColor';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
type TodoFormFieldsProps = ReturnType<typeof useTodoForm>;

export default function TodoFormFields({
  title,
  setTitle,
  description,
  setDescription,
  dueDate,
  handleDateChange,
  members,
  isAssigneeOpen,
  setIsAssigneeOpen,
  selectedAssignee,
  setSelectedAssignee,
  selectedAssigneeBgColor,
  handleClearAssignee,
  getAvatarText,
  selectBoxRef,
  tagInput,
  setTagInput,
  tags,
  isTagOpen,
  setIsTagOpen,
  openedTagMenu,
  setOpenedTagMenu,
  filteredTagOptions,
  shouldShowCreateOption,
  tagBoxRef,
  fileInputRef,
  handleAddTag,
  handleRemoveTag,
  handleTagKeyDown,
  handleDeleteTagOption,
  previewImageUrl,
  handleImageChange,
  handleRemoveImage,
}: TodoFormFieldsProps) {
  return (
    <>
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
            setTitle(e.target.value);
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
            setDescription(e.target.value);
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
    </>
  );
}
