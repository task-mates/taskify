import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';

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
  background: #76a5ea;

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
    background: #9fa6b2;
  }

  @media ${DEVICE.mobile} {
    &::before {
      left: -12px;
    }
  }
`;

export const TagBadge = styled.span`
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 600;
  border-radius: 6px;
  background: #1458bc;
  color: #cfe1fd;

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
    transform: rotate(90deg);
  }

  @media ${DEVICE.mobile} {
    width: 20px;
    height: 20px;
  }
`;

export const ActionButtonPopup = styled.div`
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  white-space: nowrap;
  padding: 12px 10px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d9d9d9;
`;

export const ActionButtonList = styled.ul``;

export const ActionButtonItem = styled.li`
  & + & {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid #d6d5d9;
  }
`;

export const ActionButton = styled.button<{ $variant?: 'default' | 'delete' }>`
  position: relative;
  padding: 10px 12px 10px 41px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 6px;
  color: ${({ $variant }) => ($variant === 'delete' ? '#E73527' : '#333236')};

  transition: background 0.3s;

  &::before {
    content: '';
    position: absolute;
    top: 10px;
    left: 12px;
    width: 20px;
    height: 20px;

    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;

    ${({ $variant }) =>
      $variant === 'delete'
        ? `
          background-image: url('/images/dummy.png');
        `
        : `
          background-image: url('/images/icon-logo.svg');
      `}
  }

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
  color: #333236;
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
  color: #333236;

  @media ${DEVICE.mobile} {
    font-size: 14px;
  }
`;

export const TaskInfoNameBadge = styled.span`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1458bc;
  color: #fff;
  border-radius: 50%;
  white-space: nowrap;
  overflow: hidden;
`;

export const DetailContent = styled.div`
  margin-top: 18px;
`;

export const Thumbnail = styled.div`
  margin-bottom: 30px;

  img {
    max-width: 360px;
    width: 100%;
  }

  @media ${DEVICE.mobile} {
    margin-bottom: 20px;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333236;
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

export const CommentBadge = styled.span`
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1458bc;
  color: #fff;
  border-radius: 50%;
  white-space: nowrap;
  overflow: hidden;
`;

export const CommentTextareaBox = styled.div<{ $expanded: boolean }>`
  position: relative;
  display: flex;
  width: 100%;

  padding: ${({ $expanded }) =>
    $expanded ? '8px 30px 38px 20px' : '0 20px 0 20px'};
  background: #fff;
  border: 1px solid #a39fb2;
  border-radius: 12px;
`;

export const CommentTextarea = styled.textarea`
  width: 100%;
  height: 40px;
  line-height: 24px;
  padding: 8px 0;

  font-weight: 500;
  color: #333236;

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
    color: #9fa6b2;
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

export const SendButton = styled.button`
  position: absolute;
  right: 6px;
  bottom: 8px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  border: none;
  cursor: pointer;
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
  color: #333236;
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
  color: #a39fb2;
`;

export const CommentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 500;
  color: #333236;
  white-space: pre-wrap;
`;
