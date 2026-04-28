import ModalActionButtons from '../common/ModalActionButtons';
import type { TodoCreateModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';

export default function TodoCreateModal({ onClose }: TodoCreateModalProps) {
  const footerGroup = (
    <ModalActionButtons onCancel={onClose} submitText="생성" />
  );

  return (
    <TodoBaseModal
      onClose={onClose}
      title="Title"
      labelId="할 일 생성 모달"
      footerGroup={footerGroup}
    >
      <S.Form>
        <S.Field>
          <S.Label htmlFor="title" $required>
            제목
          </S.Label>
          <S.Input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            required
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
          />
        </S.Field>

        <S.Row>
          <S.Field>
            <S.Label htmlFor="dueDate">마감일</S.Label>
            <S.Input
              id="dueDate"
              type="text"
              placeholder="날짜를 입력해 주세요"
            />
          </S.Field>

          <S.Field>
            <S.Label htmlFor="assignee">담당자</S.Label>
            <S.SelectBox>
              <S.SelectButton id="assignee" type="button">
                담당자 선택
              </S.SelectButton>
              <S.SelectList role="listbox">
                <S.SelectItem role="option">권다은</S.SelectItem>
                <S.SelectItem role="option">김유민</S.SelectItem>
                <S.SelectItem role="option">박현우</S.SelectItem>
                <S.SelectItem role="option">양채원</S.SelectItem>
                <S.SelectItem role="option">이차현</S.SelectItem>
              </S.SelectList>
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
