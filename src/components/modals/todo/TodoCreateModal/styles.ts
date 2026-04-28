import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
  min-height: 0;
  overflow-y: auto;
  scrollbar-color: #5b5963 transparent;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
`;

export const Field = styled.div`
  flex: 1;
`;

export const Label = styled.label<{ $required?: boolean }>`
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

export const Input = styled.input`
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

export const DatePickerWrapper = styled.div`
  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    &::before {
      z-index: 1;
      content: '';
      position: absolute;
      left: 20px;
      top: calc(50% - 2px);
      transform: translateY(-50%);
      width: 20px;
      height: 20px;
      background-image: url('/images/icon-datepicker.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      pointer-events: none;
    }
  }
`;
export const DateInput = styled(Input)`
  position: relative;
  padding-left: 46px;
  cursor: pointer;
  caret-color: transparent;
`;

export const Textarea = styled.textarea`
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

export const SelectBox = styled.div``;
export const SelectButton = styled.button`
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
export const SelectList = styled.ul`
  display: none;
`;
export const SelectItem = styled.li``;
export const UploadLabel = styled.label``;
export const UploadBox = styled.div``;
export const UploadText = styled.div``;
export const HiddenInput = styled.input``;
