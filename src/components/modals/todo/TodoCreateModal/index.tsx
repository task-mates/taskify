import styled from 'styled-components';
import Modal from '@/src/components/Modal';
import ModalActionButtons from '../common/ModalActionButtons';
import type { TodoCreateModalProps } from './type';
import { DEVICE } from '@/src/styles/Breakpoints';

export default function TodoCreateModal({ onClose }: TodoCreateModalProps) {
  return (
    <Modal onClose={onClose} labelledById="todo-create-modal-title">
      <Container>
        <Header>
          <Title id="todo-create-modal-title">할 일 생성</Title>
          <CloseButton type="button" onClick={onClose} aria-label="모달 닫기">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M19.5459 17.954C19.7572 18.1653 19.876 18.452 19.876 18.7509C19.876 19.0497 19.7572 19.3364 19.5459 19.5477C19.3346 19.7591 19.0479 19.8778 18.749 19.8778C18.4501 19.8778 18.1635 19.7591 17.9521 19.5477L12 13.5937L6.0459 19.5459C5.83455 19.7572 5.54791 19.8759 5.24902 19.8759C4.95014 19.8759 4.66349 19.7572 4.45215 19.5459C4.2408 19.3345 4.12207 19.0479 4.12207 18.749C4.12207 18.4501 4.2408 18.1635 4.45215 17.9521L10.4062 11.9999L4.45402 6.04586C4.24268 5.83451 4.12395 5.54787 4.12395 5.24898C4.12395 4.9501 4.24268 4.66345 4.45402 4.45211C4.66537 4.24076 4.95201 4.12203 5.2509 4.12203C5.54978 4.12203 5.83643 4.24076 6.04777 4.45211L12 10.4062L17.954 4.45117C18.1654 4.23983 18.452 4.12109 18.7509 4.12109C19.0498 4.12109 19.3364 4.23983 19.5478 4.45117C19.7591 4.66251 19.8778 4.94916 19.8778 5.24804C19.8778 5.54693 19.7591 5.83358 19.5478 6.04492L13.5937 11.9999L19.5459 17.954Z"
                fill="#333236"
              />
            </svg>
          </CloseButton>
        </Header>

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
          <Footer>
            <ModalActionButtons onCancel={onClose} submitText="생성" />
          </Footer>
        </Form>
      </Container>
    </Modal>
  );
}

const Container = styled.div`
  position: relative;
  margin: 0 24px;
  padding: 30px;
  max-width: 600px;
  min-width: 320px;
  width: 100%;
  background: #f3f5f8;
  border-radius: 24px;

  @media ${DEVICE.mobile} {
    padding: 24px 20px 20px;
    border-radius: 20px;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333236;

  @media ${DEVICE.mobile} {
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  width: 24px;
  height: 24px;

  svg {
    width: 100%;
    height: 100%;
  }

  @media ${DEVICE.mobile} {
    width: 20px;
    height: 20px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-top: 28px;
  min-height: 0;
  overflow-y: auto;
  scrollbar-color: #5b5963 transparent;

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

const Field = styled.div`
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

const Footer = styled.div`
  margin-top: 30px;

  @media ${DEVICE.mobile} {
    margin-top: 20px;
  }
`;
