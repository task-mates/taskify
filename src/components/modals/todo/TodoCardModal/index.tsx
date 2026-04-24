import { useRef } from 'react';
import styled from 'styled-components';
import { DEVICE } from '@/src/styles/Breakpoints';
import TodoBaseModal from '../common/TodoBaseModal';
import { TodoCardModalProps } from './type';

export default function TodoCardModal({ onClose }: TodoCardModalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const MAX_HEIGHT = 144;

  const handleInput = () => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = '40px';

    const isMultiLine = el.scrollHeight > 40;

    el.style.lineHeight = isMultiLine ? '20px' : '40px';
    el.style.padding = isMultiLine ? '10px 20px' : '0 20px';

    const nextHeight = Math.min(el.scrollHeight, MAX_HEIGHT);
    el.style.height = `${nextHeight}px`;
    el.style.overflowY = el.scrollHeight > MAX_HEIGHT ? 'auto' : 'hidden';
  };

  const badgeGroup = (
    <BadgeGroup>
      <ColumnBadge>To Do</ColumnBadge>
      <TagBadgeArea>
        <TagBadge>프로젝트</TagBadge>
        <TagBadge>프론트엔드</TagBadge>
        <TagBadge>상</TagBadge>
      </TagBadgeArea>
    </BadgeGroup>
  );

  const actionMenu = (
    <ActionMenuBox>
      <ActionMenuButton type="button">
        {/* 추후에 아이콘 컴포넌트로 변경 예정 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <path
            d="M14 22.4809C13.5187 22.4809 13.1068 22.3096 12.7641 21.9669C12.4214 21.6242 12.25 21.2122 12.25 20.731C12.25 20.2497 12.4214 19.8378 12.7641 19.4951C13.1068 19.1524 13.5187 18.981 14 18.981C14.4812 18.981 14.8932 19.1524 15.2359 19.4951C15.5786 19.8378 15.7499 20.2497 15.7499 20.731C15.7499 21.2122 15.5786 21.6242 15.2359 21.9669C14.8932 22.3096 14.4812 22.4809 14 22.4809ZM14 15.7502C13.5187 15.7502 13.1068 15.5789 12.7641 15.2361C12.4214 14.8934 12.25 14.4815 12.25 14.0002C12.25 13.519 12.4214 13.107 12.7641 12.7643C13.1068 12.4216 13.5187 12.2503 14 12.2503C14.4812 12.2503 14.8932 12.4216 15.2359 12.7643C15.5786 13.107 15.7499 13.519 15.7499 14.0002C15.7499 14.4815 15.5786 14.8934 15.2359 15.2361C14.8932 15.5789 14.4812 15.7502 14 15.7502ZM14 9.01944C13.5187 9.01944 13.1068 8.84809 12.7641 8.50538C12.4214 8.16269 12.25 7.75072 12.25 7.26947C12.25 6.78824 12.4214 6.37627 12.7641 6.03357C13.1068 5.69088 13.5187 5.51953 14 5.51953C14.4812 5.51953 14.8932 5.69088 15.2359 6.03357C15.5786 6.37627 15.7499 6.78824 15.7499 7.26947C15.7499 7.75072 15.5786 8.16269 15.2359 8.50538C14.8932 8.84809 14.4812 9.01944 14 9.01944Z"
            fill="black"
          />
        </svg>
      </ActionMenuButton>
      <ActionButtonPopup>
        <ActionButtonList>
          <ActionButtonItem>
            <ActionButton type="button">수정하기</ActionButton>
          </ActionButtonItem>
          <ActionButtonItem>
            <ActionButton type="button" $variant="delete">
              삭제하기
            </ActionButton>
          </ActionButtonItem>
        </ActionButtonList>
      </ActionButtonPopup>
    </ActionMenuBox>
  );

  return (
    <TodoBaseModal
      title="와이어프레임 만들기"
      labelId="할 일 카드 모달"
      onClose={onClose}
      badgeGroup={badgeGroup}
      actionMenu={actionMenu}
      headerVariant="card"
    >
      <TaskInfo>
        <TaskInfoItem>
          <TaskInfoLabel>담당자</TaskInfoLabel>
          <TaskInfoValue>박민영</TaskInfoValue>
        </TaskInfoItem>
        <TaskInfoItem>
          <TaskInfoLabel>마감일</TaskInfoLabel>
          <TaskInfoValue>2025년 7월 17일</TaskInfoValue>
        </TaskInfoItem>
      </TaskInfo>

      <DetailContent>
        <Thumbnail>
          <img src="/images/dummy.png" alt="썸네일 이미지" />
        </Thumbnail>
        <Description>
          먼저 전체 플로우를 개괄적으로 파악하고, 주요 화면 구성을 나열 초기
          와이어프레임은 빠르게 그리고, 이후 단계에서 세부 요소를 보완합니다.
        </Description>
      </DetailContent>

      <Divider />

      <CommentTextareaWrapper>
        <CommentBadge>정은</CommentBadge>
        <CommentTextareaBox>
          <CommentTextarea
            ref={textareaRef}
            onInput={handleInput}
            name="comment"
            placeholder="댓글을 남겨보세요"
          />
          {/* 전송 아이콘은 추후에 변경 예정 */}
          <SendButton type="submit">✈️</SendButton>
        </CommentTextareaBox>
      </CommentTextareaWrapper>

      <CommentList>
        <CommentItem>
          <CommentBadge>정은</CommentBadge>
          <CommentContent>
            <CommentInfo>
              <CommentName>김정은</CommentName>
              <CommentCreated>
                <CommentDate>2025년 7월 18일</CommentDate>{' '}
                <CommentTime>오전 9:00</CommentTime>
              </CommentCreated>
            </CommentInfo>
            <CommentText>빠르게 하는 게 가장 중요하나요?</CommentText>
          </CommentContent>
        </CommentItem>

        <CommentItem>
          <CommentBadge>정은</CommentBadge>
          <CommentContent>
            <CommentInfo>
              <CommentName>김정은</CommentName>
              <CommentCreated>
                <CommentDate>2025년 7월 18일</CommentDate>{' '}
                <CommentTime>오전 9:00</CommentTime>
              </CommentCreated>
            </CommentInfo>
            <CommentText>빠르게 하는 게 가장 중요하나요?</CommentText>
          </CommentContent>
        </CommentItem>

        <CommentItem>
          <CommentBadge>정은</CommentBadge>
          <CommentContent>
            <CommentInfo>
              <CommentName>김정은</CommentName>
              <CommentCreated>
                <CommentDate>2025년 7월 18일</CommentDate>{' '}
                <CommentTime>오전 9:00</CommentTime>
              </CommentCreated>
            </CommentInfo>
            <CommentText>빠르게 하는 게 가장 중요하나요?</CommentText>
          </CommentContent>
        </CommentItem>
      </CommentList>
    </TodoBaseModal>
  );
}

const BadgeGroup = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: flex-start;
  gap: 40px;

  @media ${DEVICE.mobile} {
    gap: 24px;
  }
`;
const ColumnBadge = styled.span`
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
const TagBadgeArea = styled.div`
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
const TagBadge = styled.span`
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

const ActionMenuBox = styled.div`
  position: relative;
  display: flex;
`;

const ActionMenuButton = styled.button`
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

const ActionButtonPopup = styled.div`
  display: none;
  position: absolute;
  top: calc(100% + 20px);
  right: 0;
  white-space: nowrap;
  padding: 12px 10px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #d9d9d9;
`;
const ActionButtonList = styled.ul``;
const ActionButtonItem = styled.li`
  & + & {
    margin-top: 5px;
    padding-top: 5px;
    border-top: 1px solid #d6d5d9;
  }
`;
const ActionButton = styled.button<{ $variant?: 'default' | 'delete' }>`
  position: relative;
  padding: 10px 12px 10px 41px;
  font-size: 16px;
  font-weight: 500;
  color: ${({ $variant }) => ($variant === 'delete' ? '#E73527' : '#333236')};

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
`;

const TaskInfo = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media ${DEVICE.mobile} {
    margin-top: 20px;
  }
`;

const TaskInfoItem = styled.div`
  padding: 12px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const TaskInfoLabel = styled.span`
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

const TaskInfoValue = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333236;

  @media ${DEVICE.mobile} {
    font-size: 14px;
  }
`;

const DetailContent = styled.div`
  margin-top: 18px;
`;
const Thumbnail = styled.div`
  margin-bottom: 30px;

  img {
    max-width: 360px;
    width: 100%;
  }

  @media ${DEVICE.mobile} {
    margin-bottom: 20px;
  }
`;
const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #333236;
  font-weight: 500;
`;

const Divider = styled.hr`
  margin: 24px 0;
  border: none;
  border-top: 1px solid #d9d9d9;
`;

const CommentTextareaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  scrollbar-color: #5b5963 transparent;
`;

const CommentBadge = styled.span`
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
`;

const CommentTextareaBox = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: 40px;
  min-height: 40px;
  line-height: 40px;
  max-height: 144px;

  padding: 0 48px 0 20px;
  font-weight: 500;
  color: #333236;
  background: #fff;
  border: 1px solid #a39fb2;
  border-radius: 12px;

  resize: none;
  overflow-y: hidden;

  &::placeholder {
    color: #9fa6b2;
  }
`;

const SendButton = styled.button`
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
`;

const CommentList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const CommentName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #333236;
`;

const CommentCreated = styled.div`
  display: flex;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
  color: #787486;
`;

const CommentDate = styled.span``;
const CommentTime = styled.span`
  color: #a39fb2;
`;

const CommentText = styled.p`
  font-size: 16px;
  line-height: 1.6;
  font-weight: 500;
  color: #333236;
`;
