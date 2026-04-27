import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { cardsApi } from '@/src/apis/cards';
import { commentsApi } from '@/src/apis/comments';
import SendIcon from '@/src/components/icons/icon-send.svg';
import EditIcon from '@/src/components/icons/icon-edit.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';
import type { Card } from '@/src/apis/cards/type';
import type { Comment } from '@/src/apis/comments/type';
import type { TodoCardModalProps } from './type';
import TodoBaseModal from '../common/TodoBaseModal';
import * as S from './styles';

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

  const [isActionMenuOpen, setIsActionMenuOpen] = useState(false);
  const actionMenuRef = useRef<HTMLDivElement | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isTextareaExpanded, setIsTextareaExpanded] = useState(false);
  const isSubmittingRef = useRef(false);

  const assigneeNickname = card?.assignee?.nickname?.trim();
  const assigneeProfileImage = card?.assignee?.profileImageUrl;
  const dueDate = card?.dueDate;
  const cardCoverImage = card?.imageUrl;
  const cardDescription = card?.description;

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
              <S.ActionButton type="button" $variant="delete">
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

  const fetchComments = async (nextCursorId?: number | null) => {
    if (isCommentLoading) return;

    try {
      setIsCommentLoading(true);

      const data = await commentsApi.getList({
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
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    setComments([]);
    setCursorId(null);
    fetchComments(null);
  }, [cardId]);

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
  }, [cursorId, isCommentLoading, comments.length]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);

    return date.toLocaleTimeString('ko-KR', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const submitComment = async () => {
    if (isSubmittingRef.current) return;

    const textarea = textareaRef.current;
    if (!textarea || !card) return;

    const content = textarea.value.trim();
    if (!content) return;

    try {
      isSubmittingRef.current = true;

      const newComment = await commentsApi.create({
        content,
        cardId,
        columnId: card.columnId,
        dashboardId,
      });

      setComments((prevComments) => [newComment, ...prevComments]);

      textarea.value = '';
      textarea.style.height = '40px';
      textarea.style.overflowY = 'hidden';
      setIsTextareaExpanded(false);
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

    const lineHeight = 24;
    const maxRows = 6;
    const minHeight = 40;
    const maxHeight = lineHeight * maxRows;

    textarea.style.height = `${minHeight}px`;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > maxHeight ? 'auto' : 'hidden';

    const isExpanded = textarea.value.includes('\n');
    setIsTextareaExpanded(isExpanded);
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
    >
      <S.TaskInfo>
        {assigneeNickname && (
          <S.TaskInfoItem>
            <S.TaskInfoLabel>담당자</S.TaskInfoLabel>
            <S.TaskInfoValue>
              <S.TaskInfoNameBadge>
                {' '}
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
        {!isTextareaExpanded && (
          <S.CommentBadge>{card?.assignee?.nickname ?? ''}</S.CommentBadge>
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
            <S.SendButton type="submit">
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
