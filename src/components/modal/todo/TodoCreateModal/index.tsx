import styled from 'styled-components';
import Modal from '../common/Modal';
import ModalActionButtons from '../common/ModalActionButtons';
import type { TodoCreateModalProps } from './type';
import { DEVICE } from '@/src/styles/Breakpoints';

export default function TodoCreateModal({ onClose }: TodoCreateModalProps) {
  return (
    <Modal
      title="할 일 생성"
      onClose={onClose}
      footer={<ModalActionButtons onCancel={onClose} submitText="생성" />}
    >
      <Form>
        <Field>
          <Label htmlFor="title" $required>
            제목
          </Label>
          <Input
            id="title"
            type="text"
            placeholder="제목을 입력해주세요"
            required
          />
        </Field>

        <Field>
          <Label htmlFor="description" $required>
            설명
          </Label>
          <Textarea
            id="description"
            placeholder="설명을 입력해주세요"
            required
          />
        </Field>

        <Row>
          <Field>
            <Label htmlFor="dueDate">마감일</Label>
            <Input
              id="dueDate"
              type="text"
              placeholder="날짜를 입력해 주세요"
            />
          </Field>

          <Field>
            <Label htmlFor="assignee">담당자</Label>
            <SelectBox>
              <SelectButton id="assignee" type="button">
                담당자 선택
              </SelectButton>
              <SelectList role="listbox">
                <SelectItem role="option">권다은</SelectItem>
                <SelectItem role="option">김유민</SelectItem>
                <SelectItem role="option">박현우</SelectItem>
                <SelectItem role="option">양채원</SelectItem>
                <SelectItem role="option">이차현</SelectItem>
              </SelectList>
            </SelectBox>
          </Field>
        </Row>

        <Field>
          <Label htmlFor="tag">태그</Label>
          <Input id="tag" type="text" placeholder="태그를 입력해주세요" />
        </Field>

        <Field>
          <Label>이미지</Label>

          <UploadLabel htmlFor="uploadfile">
            <UploadBox>
              <UploadText>+ image upload</UploadText>
            </UploadBox>
          </UploadLabel>

          <HiddenInput id="uploadfile" type="file" />
        </Field>
      </Form>
    </Modal>
  );
}

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${DEVICE.heightMd} {
    max-height: 460px;
    overflow-y: auto;
  }

  @media ${DEVICE.heightSm} {
    max-height: 300px;
  }

  @media ${DEVICE.heightXs} {
    max-height: 150px;
  }
`;
const Row = styled.div`
  display: flex;
  gap: 20px;
`;
const Field = styled.div<{ $inRow?: boolean }>`
  flex: 1;
`;
const Label = styled.label<{ $required?: boolean }>`
  display: block;
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: #333;

  ${({ $required }) =>
    $required &&
    `
    position: relative;

    &::after {
      content: '*';
      color: #00A7F5;
    }
  `}
`;
const Input = styled.input`
  width: 100%;
  padding: 6px 20px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid #d6d5d9;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;

  &::placeholder {
    color: #a39fb2;
  }
`;
const Textarea = styled.textarea`
  padding: 20px;
  width: 100%;
  height: 160px;
  border-radius: 14px;
  border: 1px solid #d6d5d9;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #333;

  &::placeholder {
    color: #a39fb2;
  }
`;
const SelectBox = styled.div``;
const SelectButton = styled.button`
  width: 100%;
  padding: 6px 20px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid #d6d5d9;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  color: #a39fb2;
  text-align: left;
`;
const SelectList = styled.ul`
  display: none;
`;
const SelectItem = styled.li``;
const UploadLabel = styled.label``;
const UploadBox = styled.div``;
const UploadText = styled.div``;
const HiddenInput = styled.input``;
