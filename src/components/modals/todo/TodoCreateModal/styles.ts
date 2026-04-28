import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
`;

export const Field = styled.div`
  flex: 1;
`;

export const Label = styled.label<{ $required?: boolean }>`
  display: inline-flex;
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

export const SelectBox = styled.div`
  position: relative;
`;
export const SelectButton = styled.button<{
  $selected: boolean;
  $open: boolean;
}>`
  position: relative;
  width: 100%;
  padding: 6px 20px;
  height: 54px;
  border-radius: 14px;
  border: 1px solid #d6d5d9;
  background: #fff;
  font-size: 16px;
  font-weight: 500;
  text-align: left;
  color: ${({ $selected }) => ($selected ? '#333236' : '#a39fb2')};

  &::after {
    z-index: 1;
    content: '';
    position: absolute;
    right: 20px;
    top: calc(50% - 2px);
    width: 18px;
    height: 18px;
    background-image: url('/images/icon-chevron-dropdown.svg');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    pointer-events: none;

    transform: ${({ $open }) =>
      $open ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)'};
  }
`;

export const SelectedAssignee = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
`;

export const SelectWrapper = styled.div`
  position: absolute;
  top: calc(100% + 3px);
  padding: 10px 16px 10px 4px;
  width: 100%;
  background: #fff;
  border: 1px solid #d6d5d9;
  border-radius: 14px;
`;
export const SelectList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 232px;
  overflow-y: auto;
  padding: 0 10px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #0000001a;
    border-radius: 999px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #0003;
  }
`;
export const OptionItem = styled.li``;
export const OptionButton = styled.button`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  width: 100%;
  border-radius: 8px;

  &:hover {
    background: rgba(159, 166, 178, 0.1);
  }
`;
export const AssigneeAvatar = styled.span<{ $imageUrl: string | null }>`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #2f9d6a;
  background-image: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl})` : 'none'};
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 8px;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
`;

export const AssigneeName = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333236;
`;

export const TagBox = styled.div`
  position: relative;
`;

export const TagOptionBox = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  width: 100%;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid #d6d5d9;
  background: #fff;

  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TagOptionTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #404040;
`;

export const TagCreateButton = styled.button`
  margin-top: 8px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #404040;
  font-weight: 600;
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const TagBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #cfe1fd;
  background: #2563eb;
`;

export const UploadLabel = styled.label``;
export const UploadBox = styled.div``;
export const UploadText = styled.div``;
export const HiddenInput = styled.input``;
