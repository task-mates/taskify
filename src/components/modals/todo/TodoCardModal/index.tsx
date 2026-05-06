import { useRef, useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import { cardsApi } from '@/src/apis/cards';
import { createComment, getCommentList } from '@/src/apis/comments';
import { usersApi } from '@/src/apis/users';
import type { Card } from '@/src/apis/cards/type';
import type { Comment } from '@/src/apis/comments/type';
import type { User } from '@/src/apis/users/type';
import type { TodoCardModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';
import SendIcon from '@/src/components/icons/icon-send.svg';
import MeatballIcon from '@/src/components/icons/icon-meatball.svg';
import EditIcon from '@/src/components/icons/icon-edit.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';

const COMMENT_TEXTAREA_MIN_HEIGHT = 40;
const COMMENT_TEXTAREA_LINE_HEIGHT = 24;
const COMMENT_TEXTAREA_MAX_ROWS = 6;
const COMMENT_TEXTAREA_MAX_HEIGHT =
  COMMENT_TEXTAREA_LINE_HEIGHT * COMMENT_TEXTAREA_MAX_ROWS;

export default function TodoCardModal({
  onClose,
  cardId,
  dashboardId,
  columnTitle,
}: TodoCardModalProps) {
  const [card, setCard] = useState<Card | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isCommentLoading, setIsCommentLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const isCommentLoadingRef = useRef(false);

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const isSubmittingRef = useRef(false);
  const [isTyping, setIsTyping] = useState(false);

  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const assigneeNickname = card?.assignee?.nickname?.trim();
  const assigneeProfileImage = card?.assignee?.profileImageUrl;
  const dueDate = card?.dueDate;
  const cardCoverImage = card?.imageUrl;
  const cardDescription = card?.description;

  const currentUserNickname = currentUser?.nickname?.trim();
  const currentUserImage = currentUser?.profileImageUrl;

  const handleDeleteCard = async () => {
    const isConfirmed = window.confirm('카드를 삭제하시겠습니까?');

    if (!isConfirmed) return;

    try {
      await cardsApi.remove(cardId);
      onClose();
    } catch (e) {
      console.error(e);
      alert('카드 삭제에 실패했습니다.');
    }
  };

  const tags = (card?.tags ?? []).filter((tag) => tag.trim());

  const badgeGroup = (
    <S.BadgeGroup>
      {columnTitle && <S.ColumnBadge>{columnTitle}</S.ColumnBadge>}
      {tags.length > 0 && (
        <S.TagBadgeArea>
          {tags.map((tag) => (
            <S.TagBadge key={tag}>{tag}</S.TagBadge>
          ))}
        </S.TagBadgeArea>
      )}
    </S.BadgeGroup>
  );

  const actionMenu = (
    <S.ActionMenuBox ref={actionMenuRef}>
      <S.ActionMenuButton
        type="button"
        onClick={() => setIsActionMenuOpen((prev) => !prev)}
      >
        <MeatballIcon />
      </S.ActionMenuButton>

      {isActionMenuOpen && (
        <S.ActionButtonPopup>
          <S.ActionButtonList>
            <S.ActionButtonItem>
              <S.ActionButton type="button">
                <EditIcon />
                수정하기
              </S.ActionButton>
            </S.ActionButtonItem>

            <S.ActionButtonItem>
              <S.ActionButton
                type="button"
                $variant="delete"
                onClick={handleDeleteCard}
              >
                <DeleteIcon />
                삭제하기
              </S.ActionButton>
            </S.ActionButtonItem>
          </S.ActionButtonList>
        </S.ActionButtonPopup>
      )}
    </S.ActionMenuBox>
  );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!actionMenuRef.current) return;

      if (!actionMenuRef.current.contains(e.target as Node)) {
        setIsActionMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const data = await cardsApi.getById(cardId);
        setCard(data);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCard();
  }, [cardId]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await usersApi.getMe();
        setCurrentUser(user);
      } catch (e) {
        console.error(e);
      }
    };

    fetchCurrentUser();
  }, []);

  // 댓글 목록 가져오는 함수 useCallback 처리
  const fetchComments = useCallback(
    async (nextCursorId?: number | null) => {
      if (isCommentLoadingRef.current) return;

      try {
        isCommentLoadingRef.current = true;
        setIsCommentLoading(true);

        const data = await getCommentList({
          cardId,
          size: 10,
          cursorId: nextCursorId ?? undefined,
        });

        setComments((prevComments) =>
          nextCursorId ? [...prevComments, ...data.comments] : data.comments
        );

        setCursorId(data.cursorId);
      } catch (e) {
        console.error(e);
      } finally {
        isCommentLoadingRef.current = false;
        setIsCommentLoading(false);
      }
    },
    [cardId]
  );

  // cardId 변경 시 초기 댓글 조회
  useEffect(() => {
    const initComments = async () => {
      await fetchComments(null);
    };

    initComments();
  }, [fetchComments]);

  // 무한스크롤
  useEffect(() => {
    if (!observerRef.current) return;
    if (!cursorId) return;
    if (isCommentLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];

        if (target.isIntersecting) {
          fetchComments(cursorId);
        }
      },
      {
        threshold: 0.1,
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [cursorId, isCommentLoading, fetchComments]);

  const submitComment = async () => {
    if (isSubmittingRef.current) return;

    const textarea = textareaRef.current;
    if (!textarea || !card) return;

    const content = textarea.value.trim();
    if (!content) return;

    try {
      isSubmittingRef.current = true;

      const newComment = await createComment({
        content,
        cardId,
        columnId: card.columnId,
        dashboardId,
      });

      setComments((prevComments) => [newComment, ...prevComments]);

      textarea.value = '';
      textarea.style.height = `${COMMENT_TEXTAREA_MIN_HEIGHT}px`;
      textarea.style.overflowY = 'hidden';
      setIsTextareaExpanded(false);
      setIsTyping(false);
    } catch (e) {
      console.error(e);
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await submitComment();
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      await submitComment();
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const textarea = e.target;

    setIsTyping(textarea.value.trim().length > 0);

    textarea.style.height = `${COMMENT_TEXTAREA_MIN_HEIGHT}px`;

    textarea.style.height = `${Math.min(
      textarea.scrollHeight,
      COMMENT_TEXTAREA_MAX_HEIGHT
    )}px`;

    textarea.style.overflowY =
      textarea.scrollHeight > COMMENT_TEXTAREA_MAX_HEIGHT ? 'auto' : 'hidden';

    const isExpanded =
      textarea.value.includes('\n') ||
      textarea.scrollHeight > COMMENT_TEXTAREA_MIN_HEIGHT;

    setIsTextareaExpanded(isExpanded);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString.replace('Z', '')).format('YYYY년 M월 D일');
  };

  const formatTime = (dateString: string) => {
    const time = dayjs(dateString.replace('Z', ''));

    return `${time.hour() < 12 ? '오전' : '오후'} ${time.format('h:mm')}`;
  };

  return (
    <TodoBaseModal
      title={card?.title ?? ''}
      labelId="할 일 카드 모달"
      onClose={onClose}
      badgeGroup={badgeGroup}
      actionMenu={actionMenu}
      headerVariant="card"
      overlayVariant="full"
      layoutVariant="card"
    >
      <S.TaskInfo>
        {assigneeNickname && (
          <S.TaskInfoItem>
            <S.TaskInfoLabel>담당자</S.TaskInfoLabel>
            <S.TaskInfoValue>
              <S.TaskInfoNameBadge>
                {assigneeProfileImage ? (
                  <Image
                    src={assigneeProfileImage}
                    alt={assigneeNickname}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                ) : (
                  assigneeNickname
                )}
              </S.TaskInfoNameBadge>
              {assigneeNickname}
            </S.TaskInfoValue>
          </S.TaskInfoItem>
        )}

        {dueDate && (
          <S.TaskInfoItem>
            <S.TaskInfoLabel>마감일</S.TaskInfoLabel>
            <S.TaskInfoValue>{formatDate(dueDate)}</S.TaskInfoValue>
          </S.TaskInfoItem>
        )}
      </S.TaskInfo>

      <S.DetailContent>
        {cardCoverImage && (
          <S.Thumbnail>
            <Image
              src={cardCoverImage}
              alt="썸네일"
              fill
              style={{ objectFit: 'cover' }}
            />
          </S.Thumbnail>
        )}

        {cardDescription && <S.Description>{cardDescription}</S.Description>}
      </S.DetailContent>

      <S.Divider />

      <S.CommentTextareaWrapper $expanded={isTextareaExpanded}>
        {!isTextareaExpanded && currentUserNickname && (
          <S.CommentBadge>
            {currentUserImage ? (
              <Image
                src={currentUserImage}
                alt={currentUserNickname}
                fill
                style={{ objectFit: 'cover' }}
              />
            ) : (
              currentUserNickname
            )}
          </S.CommentBadge>
        )}

        <form onSubmit={handleSubmit}>
          <S.CommentTextareaBox $expanded={isTextareaExpanded}>
            <S.CommentTextarea
              ref={textareaRef}
              name="comment"
              placeholder="댓글을 남겨보세요"
              onChange={handleCommentChange}
              onKeyDown={handleKeyDown}
            />

            <S.SendButton
              $active={isTyping}
              type="submit"
              aria-label="댓글 등록"
            >
              <SendIcon />
            </S.SendButton>
          </S.CommentTextareaBox>
        </form>
      </S.CommentTextareaWrapper>

      <S.CommentList>
        {comments.map((comment) => (
          <S.CommentItem key={comment.id}>
            <S.CommentBadge>{comment.author.nickname}</S.CommentBadge>

            <S.CommentContent>
              <S.CommentInfo>
                <S.CommentName>{comment.author.nickname}</S.CommentName>

                <S.CommentCreated>
                  <S.CommentDate>{formatDate(comment.createdAt)}</S.CommentDate>
                  <S.CommentTime>{formatTime(comment.createdAt)}</S.CommentTime>
                </S.CommentCreated>
              </S.CommentInfo>

              <S.CommentText>{comment.content}</S.CommentText>
            </S.CommentContent>
          </S.CommentItem>
        ))}

        <div ref={observerRef} style={{ height: '1px' }} />
      </S.CommentList>
    </TodoBaseModal>
  );
}
