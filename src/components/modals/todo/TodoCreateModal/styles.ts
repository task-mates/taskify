import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media ${DEVICE.mobile} {
    gap: 20px;
  }
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;

  @media ${DEVICE.mobile} {
    flex-direction: column;
  }
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

  @media ${DEVICE.mobile} {
    margin-bottom: 10px;
    font-size: 14px;
  }
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

  @media ${DEVICE.mobile} {
    height: 48px;
    border-radius: 12px;
  }
`;

export const DatePickerWrapper = styled.div<{ $selected: boolean }>`
  position: relative;

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
      filter: ${({ $selected }) => ($selected ? 'invert(1)' : 'invert(0)')};
      background-image: url('/images/icon-datepicker.svg');
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
      pointer-events: none;
    }

    .react-datepicker__close-icon {
      right: 14px;
    }
    .react-datepicker__close-icon::after {
      content: '';
      background-color: #000;
      background-image: url(/images/icon-close-wh.svg);
      background-size: 60%;
      background-position: center;
      background-repeat: no-repeat;
    }
  }

  .react-datepicker-popper {
    z-index: 2;
    top: calc(100% + 8px) !important;
    transform: translate(0) !important;
    width: auto;
  }

  .react-datepicker-popper[data-placement^='bottom']
    .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker-popper[data-placement^='top'] .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker {
    display: flex;
    border-radius: 14px;
    overflow: hidden;
    border: 1px solid #d6d5d9;
  }

  .react-datepicker__month-container {
    float: none;
    border-right: 1px solid #d6d5d9;
  }

  .react-datepicker__navigation-icon::before,
  .react-datepicker__year-read-view--down-arrow,
  .react-datepicker__month-read-view--down-arrow,
  .react-datepicker__month-year-read-view--down-arrow {
    top: 10px;
    border-width: 2px 2px 0 0;
    border-color: #d6d5d9;
  }

  .react-datepicker__header {
    padding: 10px 0;
    background-color: #fff;
    border-radius: 0;
    border-bottom: 1px solid #d6d5d9;
  }

  .react-datepicker__day-name,
  .react-datepicker__day,
  .react-datepicker__time-name {
    width: 36px;
    line-height: 36px;
    font-size: 14px;
  }

  .react-datepicker__day:not([aria-disabled='true']):hover,
  .react-datepicker__month-text:not([aria-disabled='true']):hover,
  .react-datepicker__quarter-text:not([aria-disabled='true']):hover,
  .react-datepicker__year-text:not([aria-disabled='true']):hover {
    border-radius: 50%;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    border-radius: 50%;
    background-color: #83c6e5;
    color: #fff;
  }

  .react-datepicker__day--keyboard-selected:not([aria-disabled='true']):hover,
  .react-datepicker__month-text--keyboard-selected:not(
      [aria-disabled='true']
    ):hover,
  .react-datepicker__quarter-text--keyboard-selected:not(
      [aria-disabled='true']
    ):hover,
  .react-datepicker__year-text--keyboard-selected:not(
      [aria-disabled='true']
    ):hover {
    border-radius: 50%;
    background-color: #6fb3d2;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-selecting-range,
  .react-datepicker__day--in-range,
  .react-datepicker__month-text--selected,
  .react-datepicker__month-text--in-selecting-range,
  .react-datepicker__month-text--in-range,
  .react-datepicker__quarter-text--selected,
  .react-datepicker__quarter-text--in-selecting-range,
  .react-datepicker__quarter-text--in-range,
  .react-datepicker__year-text--selected,
  .react-datepicker__year-text--in-selecting-range,
  .react-datepicker__year-text--in-range {
    border-radius: 50%;
    background-color: #83c6e5;
  }

  .react-datepicker__day--selected:not([aria-disabled='true']):hover,
  .react-datepicker__day--in-selecting-range:not([aria-disabled='true']):hover,
  .react-datepicker__day--in-range:not([aria-disabled='true']):hover,
  .react-datepicker__month-text--selected:not([aria-disabled='true']):hover,
  .react-datepicker__month-text--in-selecting-range:not(
      [aria-disabled='true']
    ):hover,
  .react-datepicker__month-text--in-range:not([aria-disabled='true']):hover,
  .react-datepicker__quarter-text--selected:not([aria-disabled='true']):hover,
  .react-datepicker__quarter-text--in-selecting-range:not(
      [aria-disabled='true']
    ):hover,
  .react-datepicker__quarter-text--in-range:not([aria-disabled='true']):hover,
  .react-datepicker__year-text--selected:not([aria-disabled='true']):hover,
  .react-datepicker__year-text--in-selecting-range:not(
      [aria-disabled='true']
    ):hover,
  .react-datepicker__year-text--in-range:not([aria-disabled='true']):hover {
    border-radius: 50%;
    background-color: #6fb3d2;
  }

  .react-datepicker__time-container {
    float: none;
    height: 252px;
    border-left: none;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item {
    height: 36px;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected {
    background-color: #83c6e5;
  }

  .react-datepicker__time-container
    .react-datepicker__time
    .react-datepicker__time-box
    ul.react-datepicker__time-list
    li.react-datepicker__time-list-item--selected:hover {
    background-color: #6fb3d2;
  }

  @media ${DEVICE.mobile} {
    .react-datepicker-popper {
      top: calc(100% + 4px) !important;
    }
  }

  @media (max-width: 499px) {
    .react-datepicker-popper {
      width: 100%;
    }

    .react-datepicker {
      border-radius: 12px;
    }

    .react-datepicker__header {
      padding: 8px 0;
    }

    .react-datepicker__month-container {
      flex: 1;
    }

    .react-datepicker__day-name,
    .react-datepicker__day,
    .react-datepicker__time-name {
      width: 30px;
      line-height: 30px;
      font-size: 13px;
    }

    .react-datepicker__time-container {
      width: 65px;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box {
      width: 65px;
    }

    .react-datepicker__time-container
      .react-datepicker__time
      .react-datepicker__time-box
      ul.react-datepicker__time-list
      li.react-datepicker__time-list-item {
      font-size: 13px;
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
  resize: none;

  &::placeholder {
    color: #a39fb2;
  }

  @media ${DEVICE.mobile} {
    height: 120px;
    border-radius: 12px;
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

  @media ${DEVICE.mobile} {
    height: 48px;
    border-radius: 12px;
  }
`;

export const SelectedAssignee = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  @media ${DEVICE.mobile} {
    gap: 6px;
  }
`;

export const SelectWrapper = styled.div`
  z-index: 1;
  position: absolute;
  top: calc(100% + 8px);
  padding: 10px 16px 10px 4px;
  width: 100%;
  background: #fff;
  border: 1px solid #d6d5d9;
  border-radius: 14px;

  @media ${DEVICE.mobile} {
    top: calc(100% + 4px);
    padding: 3px 16px 3px 4px;
    border-radius: 12px;
  }
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

  @media ${DEVICE.mobile} {
    gap: 6px;
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

  @media ${DEVICE.mobile} {
    padding: 10px 5px;
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

export const TagInputArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;

  width: 100%;
  min-height: 54px;
  padding: 8px 20px;
  border-radius: 14px;
  border: 1px solid #d6d5d9;
  background: #fff;

  cursor: text;

  @media ${DEVICE.mobile} {
    min-height: 48px;
    border-radius: 12px;
  }
`;

export const TagInput = styled.input`
  flex: 1 0 120px;
  min-width: 120px;

  border: none;
  outline: none;
  background: transparent;

  font-size: 16px;
  font-weight: 500;
  color: #333;

  &::placeholder {
    color: #a39fb2;
  }
`;

export const SelectedTagBadge = styled.span<{
  $backgroundColor: string;
  $color: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: 4px;

  padding: 4px 6px;
  border-radius: 6px;

  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $backgroundColor }) => $backgroundColor};

  @media ${DEVICE.mobile} {
    align-items: flex-start;
  }
`;

export const TagRemoveButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
`;

export const TagOptionBox = styled.div`
  z-index: 1;
  position: absolute;
  top: calc(100% + 8px);
  width: 100%;
  padding: 16px 18px;
  border-radius: 12px;
  border: 1px solid #d6d5d9;
  background: #fff;

  display: flex;
  flex-direction: column;
  max-height: 285px;
  overflow-y: auto;

  @media ${DEVICE.mobile} {
    top: calc(100% + 4px);
    max-height: 155px;
  }
`;

export const TagOptionTitle = styled.p`
  font-size: 12px;
  font-weight: 600;
  color: #404040;
`;

export const TagMoreButtonWrapper = styled.div`
  position: absolute;
  right: 8px;
`;

export const TagMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 28px;
  height: 28px;
  border-radius: 6px;

  color: #666;
  font-size: 18px;
  line-height: 1;

  cursor: pointer;

  opacity: 0;
  visibility: hidden;

  &:hover {
    background: rgba(159, 166, 178, 0.2);
  }

  @media ${DEVICE.mobile} {
    opacity: 1;
    visibility: visible;
  }
`;

export const TagOptionItem = styled.div<{
  $isMenuOpen: boolean;
  $hasOpenedMenu: boolean;
}>`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  border-radius: 8px;

  &:first-of-type {
    margin-top: 8px;
  }

  cursor: ${({ $hasOpenedMenu }) => ($hasOpenedMenu ? 'default' : 'pointer')};

  background: ${({ $isMenuOpen }) =>
    $isMenuOpen ? 'rgba(159, 166, 178, 0.1)' : 'transparent'};

  &:hover {
    background: ${({ $hasOpenedMenu, $isMenuOpen }) =>
      $hasOpenedMenu && !$isMenuOpen
        ? 'transparent'
        : 'rgba(159, 166, 178, 0.1)'};
  }

  &:hover ${TagMoreButton} {
    opacity: ${({ $hasOpenedMenu, $isMenuOpen }) =>
      $hasOpenedMenu && !$isMenuOpen ? 0 : 1};
    visibility: ${({ $hasOpenedMenu, $isMenuOpen }) =>
      $hasOpenedMenu && !$isMenuOpen ? 'hidden' : 'visible'};
  }

  ${({ $isMenuOpen }) =>
    $isMenuOpen &&
    `
      ${TagMoreButton} {
        opacity: 1;
        visibility: visible;
      }
    `}
`;

export const TagOptionButton = styled.button<{ $hasOpenedMenu: boolean }>`
  display: flex;
  align-items: center;

  flex: 1;
  min-width: 0;
  padding: 6px 8px;

  cursor: ${({ $hasOpenedMenu }) => ($hasOpenedMenu ? 'default' : 'pointer')};
`;

export const TagDeletePopup = styled.div`
  z-index: 3;
  position: absolute;
  right: calc(100% + 4px);
  top: 50%;
  transform: translateY(-50%);

  width: 96px;
  padding: 6px;

  border: 1px solid #d6d5d9;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
`;

export const TagDeleteButton = styled.button`
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;

  display: flex;
  align-items: center;
  gap: 6px;

  color: #e73527;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: rgba(231, 53, 39, 0.1);
  }
`;

export const TagCreateButton = styled.button`
  margin-top: 8px;

  display: flex;
  align-items: center;
  gap: 8px;

  width: 100%;
  padding: 6px 8px;
  border-radius: 8px;

  font-size: 13px;
  color: #404040;
  font-weight: 600;

  &:hover {
    background: rgba(159, 166, 178, 0.1);
  }
`;

export const TagBadge = styled.span<{
  $backgroundColor: string;
  $color: string;
}>`
  display: inline-flex;
  align-items: center;

  padding: 4px 6px;
  border-radius: 6px;

  font-size: 13px;
  font-weight: 600;
  color: ${({ $color }) => $color};
  background: ${({ $backgroundColor }) => $backgroundColor};
`;

export const PreviewImageBox = styled.div`
  position: relative;
  width: 230px;
  height: 140px;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 14px;
  border: 1px solid #a39fb2;
`;

export const RemoveImageButton = styled.button`
  position: absolute;
  top: -8px;
  right: -8px;

  width: 28px;
  height: 28px;
  border: 1px solid #fff;
  background-color: #524f5b;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  &::before,
  &::after {
    content: '';
    position: absolute;

    width: 12px;
    height: 2px;
    background-color: #fff;
  }
  &::before {
    transform: rotate(45deg);
  }
  &::after {
    transform: rotate(-45deg);
  }
`;

export const UploadLabel = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
`;

export const UploadBox = styled.div`
  width: 100%;
  height: 140px;
  border: 2px dashed #524f5b;
  border-radius: 14px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;

  background-color: #fff;
  color: #9fa0b0;

  svg {
    width: 32px;
    height: 32px;
  }
`;

export const UploadText = styled.span`
  font-size: 16px;
  font-weight: 700;
  color: #a39fb2;
`;

export const HiddenInput = styled.input`
  display: none;
`;
