import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import Button from '@/src/components/common/Button';

export const BadgeGroup = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: flex-start;
  gap: 40px;

  @media ${DEVICE.mobile} {
    gap: 24px;
  }
`;

export const ColumnBadge = styled.span`
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 600;
  color: #cfe1fd;
  background: var(--color-blue-100);

  @media ${DEVICE.mobile} {
    padding: 4px 8px;
    font-size: 12px;
  }
`;

export const TagBadgeArea = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    left: -20px;
    top: 2px;
    width: 1px;
    height: 18px;
    background: var(--color-gray-400);
  }

  @media ${DEVICE.mobile} {
    &::before {
      left: -12px;
    }
  }
`;

export const TagBadge = styled.span<{
  $backgroundColor: string;
  $color: string;
}>`
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  background: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ $color }) => $color};

  @media ${DEVICE.mobile} {
    font-size: 12px;
  }
`;

export const ActionMenuBox = styled.div`
  position: relative;
  display: flex;
`;

export const ActionMenuButton = styled.button`
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

export const ActionButtonPopup = styled.div`
  z-index: 5;
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  white-space: nowrap;
  padding: 12px 10px;
  background: var(--color-white);
  border-radius: 12px;
  border: 1px solid var(--color-gray-300);
`;

export const ActionButtonList = styled.ul``;

export const ActionButtonItem = styled.li`
  & + & {
    margin-top: 5px;
    padding-top: 5px;
    position: relative;
  }
  & + &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 93px;
    height: 1px;
    background: var(--color-gray-300);
  }
`;

export const ActionButton = styled.button<{ $variant?: 'default' | 'delete' }>`
  position: relative;
  padding: 10px 12px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  color: ${({ $variant }) =>
    $variant === 'delete' ? 'var(--color-red)' : 'var(--color-black-200)'};

  display: flex;
  align-items: center;
  gap: 9px;

  transition: background 0.3s;

  &:hover {
    background: rgba(243, 245, 248, 0.5);
  }
`;

export const TaskInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TaskInfoItem = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const TaskInfoLabel = styled.span`
  min-width: 50px;
  font-size: 14px;
  color: var(--color-black-200);
  font-weight: 600;
  position: relative;
  top: -1px;

  @media ${DEVICE.mobile} {
    font-size: 13px;
  }
`;

export const TaskInfoValue = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 16px;
  font-weight: 500;
  color: var(--color-black-200);

  @media ${DEVICE.mobile} {
    font-size: 14px;
  }
`;

export const TaskInfoNameBadge = styled.span<{
  $backgroundColor: string;
}>`
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $backgroundColor }) => $backgroundColor};
  color: var(--color-white);
  border-radius: 50%;
  white-space: nowrap;
  overflow: hidden;
`;

export const DetailContent = styled.div``;

export const Thumbnail = styled.div`
  margin-top: 18px;
  margin-bottom: 30px;
  position: relative;
  width: 100%;

  @media ${DEVICE.mobile} {
    margin-top: 8px;
    margin-bottom: 20px;
  }
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-black-200);
  font-weight: 500;
`;

export const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #d9d9d9;
`;

export const CommentTextareaWrapper = styled.div<{ $expanded: boolean }>`
  display: flex;
  align-items: ${({ $expanded }) => ($expanded ? 'stretch' : 'center')};
  gap: 12px;
`;

export const CommentBadge = styled.span<{
  $backgroundColor: string;
}>`
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ $backgroundColor }) => $backgroundColor};
  color: var(--color-white);
  border-radius: 50%;
  white-space: nowrap;
  overflow: hidden;
`;

export const CommentTextareaBox = styled.div<{ $expanded: boolean }>`
  position: relative;
  display: flex;
  width: 100%;

  padding: ${({ $expanded }) =>
    $expanded ? '8px 30px 38px 20px' : '0 30px 0 20px'};
  background: var(--color-white);
  border: 1px solid var(--color-gray-400);
  border-radius: 12px;

  &:focus-within {
    border-color: var(--color-brand-500);
  }
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  height: 40px;
  line-height: 24px;
  padding: 8px 0;

  font-weight: 500;
  color: var(--color-black-200);

  resize: none;
  overflow-y: hidden;

  border: none;

  &:focus,
  &:focus-visible,
  &:active {
    border: none;
    outline: none;
  }

  &::placeholder {
    color: var(--color-gray-400);
  }

  &::-webkit-scrollbar {
    width: 3px;
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

export const SendButton = styled.button<{ $active: boolean }>`
  position: absolute;
  right: 12px;
  bottom: 8px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  cursor: pointer;

  svg path {
    stroke: ${({ $active }) =>
      $active ? 'var(--color-brand-500)' : 'var(--color-gray-300)'};
  }
`;

export const CommentList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

export const CommentContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const CommentInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
`;

export const CommentName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: var(--color-black-200);
`;

export const CommentCreated = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #787486;
`;

export const CommentDate = styled.span``;
export const CommentTime = styled.span`
  color: var(--color-gray-400);
`;

export const CommentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 500;
  color: var(--color-black-200);
  white-space: pre-wrap;
`;

export const CommentActionGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-left: auto;
`;

export const CommentActionButton = styled.button`
  border: 0;
  background: none;
  color: var(--color-gray-400);
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: var(--color-black-200);
  }
`;

export const CommentUpdateBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CommentUpdateTextarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 8px 12px;
  border: 1px solid var(--color-gray-300);
  border-radius: 12px;
  resize: none;

  color: var(--color-black-200);
  font-size: 14px;
  line-height: 20px;

  &:focus {
    outline: none;
    border-color: var(--color-brand-500);
  }
`;

export const CommentUpdateButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const CommentUpdateButton = styled(Button).attrs<{
  $variant?: 'primary';
}>(({ $variant }) => ({
  variant: $variant === 'primary' ? 'primary' : 'secondary',
}))<{ $variant?: 'primary' }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 500;
`;
