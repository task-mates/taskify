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
import ModalActionButtons from '../common/ModalActionButtons';
import TodoUpdateForm, { TODO_UPDATE_FORM_ID } from '../TodoUpdateForm';
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

  const [modalMode, setModalMode] = useState<'detail' | 'update'>('detail');

  const fetchCard = useCallback(async () => {
    try {
      const data = await cardsApi.getById(cardId);
      setCard(data);
    } catch (e) {
      console.error(e);
    }
  }, [cardId]);

  const handleDeleteCard = async () => {
    console.log('삭제 버튼 클릭됨');
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

  const TAG_COLORS = [
    { backgroundColor: '#E5E7EB', color: '#374151' },
    { backgroundColor: '#F4E3D7', color: '#8A4B2A' },
    { backgroundColor: '#FADFCB', color: '#B85C2E' },
    { backgroundColor: '#F8E7B8', color: '#A36A00' },
    { backgroundColor: '#DDEFE3', color: '#2F6F4E' },
    { backgroundColor: '#D8ECFF', color: '#2D6FA3' },
    { backgroundColor: '#E7DDF7', color: '#6E4BA3' },
    { backgroundColor: '#F7DDE8', color: '#A33E68' },
    { backgroundColor: '#F9D9D6', color: '#B84038' },
  ];

  const getTagColorByName = (tagName: string) => {
    const hash = [...tagName].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0
    );

    return TAG_COLORS[hash % TAG_COLORS.length];
  };

  const tags = (card?.tags ?? []).filter((tag) => tag.trim());
  const badgeGroup = (
    <S.BadgeGroup>
      {columnTitle && <S.ColumnBadge>{columnTitle}</S.ColumnBadge>}

      {tags.length > 0 && (
        <S.TagBadgeArea>
          {tags.map((tag) => {
            const tagColor = getTagColorByName(tag);

            return (
              <S.TagBadge
                key={tag}
                $backgroundColor={tagColor.backgroundColor}
                $color={tagColor.color}
              >
                {tag}
              </S.TagBadge>
            );
          })}
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
              <S.ActionButton
                type="button"
                onClick={() => {
                  setIsActionMenuOpen(false);
                  setModalMode('update');
                }}
              >
                <EditIcon />
                수정하기
              </S.ActionButton>
            </S.ActionButtonItem>

            <S.ActionButtonItem>
              <S.ActionButton
                type="button"
                $variant="delete"
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCard();
                }}
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

  const updateFooterGroup = (
    <ModalActionButtons
      onCancel={() => setModalMode('detail')}
      submitText="수정"
      formId={TODO_UPDATE_FORM_ID}
    />
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
    const loadCard = async () => {
      await fetchCard();
    };

    loadCard();
  }, [fetchCard]);

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

  const COMMENT_MAX_LENGTH = 255;

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

  const getAvatarText = (nickname: string) => {
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) return '';

    const isKorean = /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(trimmedNickname);

    return isKorean ? trimmedNickname.slice(1, 3) : trimmedNickname.slice(0, 1);
  };

  return (
    <TodoBaseModal
      title={modalMode === 'detail' ? (card?.title ?? '') : '할 일 수정'}
      labelId={modalMode === 'detail' ? '할 일 카드 모달' : '할 일 수정 모달'}
      onClose={onClose}
      badgeGroup={modalMode === 'detail' ? badgeGroup : undefined}
      actionMenu={modalMode === 'detail' ? actionMenu : undefined}
      footerGroup={modalMode === 'update' ? updateFooterGroup : undefined}
      headerVariant={modalMode === 'detail' ? 'card' : 'default'}
      overlayVariant="full"
      layoutVariant={modalMode === 'detail' ? 'card' : 'default'}
    >
      {modalMode === 'detail' ? (
        <>
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
                      getAvatarText(assigneeNickname)
                    )}
                  </S.TaskInfoNameBadge>
                  {assigneeNickname}
                </S.TaskInfoValue>
              </S.TaskInfoItem>
            )}

            {dueDate && (
              <S.TaskInfoItem>
                <S.TaskInfoLabel>마감일</S.TaskInfoLabel>
                <S.TaskInfoValue>
                  {formatDate(dueDate)} {formatTime(dueDate)}
                </S.TaskInfoValue>
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

            {cardDescription && (
              <S.Description>{cardDescription}</S.Description>
            )}
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
                  getAvatarText(currentUserNickname)
                )}
              </S.CommentBadge>
            )}

            <form onSubmit={handleSubmit}>
              <S.CommentTextareaBox $expanded={isTextareaExpanded}>
                <S.CommentTextarea
                  ref={textareaRef}
                  name="comment"
                  placeholder="댓글을 남겨보세요"
                  maxLength={COMMENT_MAX_LENGTH}
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
                <S.CommentBadge>
                  {getAvatarText(comment.author.nickname)}
                </S.CommentBadge>

                <S.CommentContent>
                  <S.CommentInfo>
                    <S.CommentName>{comment.author.nickname}</S.CommentName>

                    <S.CommentCreated>
                      <S.CommentDate>
                        {formatDate(comment.createdAt)}
                      </S.CommentDate>
                      <S.CommentTime>
                        {formatTime(comment.createdAt)}
                      </S.CommentTime>
                    </S.CommentCreated>
                  </S.CommentInfo>

                  <S.CommentText>{comment.content}</S.CommentText>
                </S.CommentContent>
              </S.CommentItem>
            ))}

            <div ref={observerRef} style={{ height: '1px' }} />
          </S.CommentList>
        </>
      ) : (
        card && (
          <TodoUpdateForm
            cardId={cardId}
            dashboardId={dashboardId}
            columnId={card.columnId}
            onSuccess={async () => {
              await fetchCard();
              setModalMode('detail');
            }}
          />
        )
      )}
    </TodoBaseModal>
  );
}
