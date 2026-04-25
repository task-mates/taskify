import { useRef } from 'react';
import TodoBaseModal from '../common/TodoBaseModal';
import { TodoCardModalProps } from './type';
import * as S from './styles';

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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const textarea = textareaRef.current;
    if (!textarea) return;

    const comment = textarea.value.trim();

    if (!comment) return;

    console.log('댓글 전송:', comment);

    // TODO: 나중에 댓글 생성 API 연결
    // await createComment(comment);

    textarea.value = '';
    textarea.style.height = '40px';
    textarea.style.lineHeight = '40px';
    textarea.style.padding = '0 48px 0 20px';
    textarea.style.overflowY = 'hidden';
  };

  const badgeGroup = (
    <S.BadgeGroup>
      <S.ColumnBadge>To Do</S.ColumnBadge>
      <S.TagBadgeArea>
        <S.TagBadge>프로젝트</S.TagBadge>
        <S.TagBadge>프론트엔드</S.TagBadge>
        <S.TagBadge>상</S.TagBadge>
      </S.TagBadgeArea>
    </S.BadgeGroup>
  );

  const actionMenu = (
    <S.ActionMenuBox>
      <S.ActionMenuButton type="button">
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
      </S.ActionMenuButton>
      <S.ActionButtonPopup>
        <S.ActionButtonList>
          <S.ActionButtonItem>
            <S.ActionButton type="button">수정하기</S.ActionButton>
          </S.ActionButtonItem>
          <S.ActionButtonItem>
            <S.ActionButton type="button" $variant="delete">
              삭제하기
            </S.ActionButton>
          </S.ActionButtonItem>
        </S.ActionButtonList>
      </S.ActionButtonPopup>
    </S.ActionMenuBox>
  );

  return (
    <TodoBaseModal
      title="와이어프레임 만들기"
      labelId="할 일 카드 모달"
      onClose={onClose}
      badgeGroup={badgeGroup}
      actionMenu={actionMenu}
      headerVariant="card"
      overlayVariant="full"
    >
      <S.TaskInfo>
        <S.TaskInfoItem>
          <S.TaskInfoLabel>담당자</S.TaskInfoLabel>
          <S.TaskInfoValue>박민영</S.TaskInfoValue>
        </S.TaskInfoItem>
        <S.TaskInfoItem>
          <S.TaskInfoLabel>마감일</S.TaskInfoLabel>
          <S.TaskInfoValue>2025년 7월 17일</S.TaskInfoValue>
        </S.TaskInfoItem>
      </S.TaskInfo>

      <S.DetailContent>
        <S.Thumbnail>
          <img src="/images/dummy.png" alt="썸네일 이미지" />
        </S.Thumbnail>
        <S.Description>
          먼저 전체 플로우를 개괄적으로 파악하고, 주요 화면 구성을 나열 초기
          와이어프레임은 빠르게 그리고, 이후 단계에서 세부 요소를 보완합니다.
        </S.Description>
      </S.DetailContent>

      <S.Divider />

      <S.CommentTextareaWrapper>
        <S.CommentBadge>정은</S.CommentBadge>
        <form onSubmit={handleSubmit}>
          <S.CommentTextareaBox>
            <S.CommentTextarea
              ref={textareaRef}
              onInput={handleInput}
              name="comment"
              placeholder="댓글을 남겨보세요"
            />
            {/* 전송 아이콘은 추후에 변경 예정 */}
            <S.SendButton type="submit">✈️</S.SendButton>
          </S.CommentTextareaBox>
        </form>
      </S.CommentTextareaWrapper>

      <S.CommentList>
        <S.CommentItem>
          <S.CommentBadge>정은</S.CommentBadge>
          <S.CommentContent>
            <S.CommentInfo>
              <S.CommentName>김정은</S.CommentName>
              <S.CommentCreated>
                <S.CommentDate>2025년 7월 18일</S.CommentDate>{' '}
                <S.CommentTime>오전 9:00</S.CommentTime>
              </S.CommentCreated>
            </S.CommentInfo>
            <S.CommentText>빠르게 하는 게 가장 중요하나요?</S.CommentText>
          </S.CommentContent>
        </S.CommentItem>

        <S.CommentItem>
          <S.CommentBadge>정은</S.CommentBadge>
          <S.CommentContent>
            <S.CommentInfo>
              <S.CommentName>김정은</S.CommentName>
              <S.CommentCreated>
                <S.CommentDate>2025년 7월 18일</S.CommentDate>{' '}
                <S.CommentTime>오전 9:00</S.CommentTime>
              </S.CommentCreated>
            </S.CommentInfo>
            <S.CommentText>빠르게 하는 게 가장 중요하나요?</S.CommentText>
          </S.CommentContent>
        </S.CommentItem>

        <S.CommentItem>
          <S.CommentBadge>정은</S.CommentBadge>
          <S.CommentContent>
            <S.CommentInfo>
              <S.CommentName>김정은</S.CommentName>
              <S.CommentCreated>
                <S.CommentDate>2025년 7월 18일</S.CommentDate>{' '}
                <S.CommentTime>오전 9:00</S.CommentTime>
              </S.CommentCreated>
            </S.CommentInfo>
            <S.CommentText>빠르게 하는 게 가장 중요하나요?</S.CommentText>
          </S.CommentContent>
        </S.CommentItem>
      </S.CommentList>
    </TodoBaseModal>
  );
}
