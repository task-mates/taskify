'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { membersApi } from '@/src/apis/members';
import type { Member } from '@/src/apis/members/type';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import { usersApi } from '@/src/apis/users';
import * as S from './styles';

const MAX_PC = 4;
const MAX_TABLET = 2;

interface MemberProfilesProps {
  dashboardId: number;
}

export default function MemberProfiles({ dashboardId }: MemberProfilesProps) {
  const [members, setMembers] = useState<Member[]>([]);
  const [myUserId, setMyUserId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [popupPos, setPopupPos] = useState({ top: 0, right: 0 });
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    membersApi
      .getList(dashboardId)
      .then(({ members }) => setMembers(members))
      .catch((err) => console.error(err));
  }, [dashboardId]);

  useEffect(() => {
    usersApi
      .getMe()
      .then((u) => setMyUserId(u.id))
      .catch(() => null);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (!isOpen && wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setPopupPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
    setIsOpen((prev) => !prev);
  };

  const popup = isOpen
    ? createPortal(
        <S.Popup
          $top={popupPos.top}
          $right={popupPos.right}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <S.PopupTitle>구성원</S.PopupTitle>
          <S.PopupList>
            {members.map((member) => (
              <S.PopupItem key={member.id}>
                <S.PopupAvatar>
                  {member.profileImageUrl ? (
                    <Image
                      src={member.profileImageUrl}
                      alt={member.nickname}
                      width={34}
                      height={34}
                      style={{ borderRadius: '50%', objectFit: 'cover' }}
                    />
                  ) : (
                    <S.PopupAvatarFallback
                      style={{
                        background: getProfileColorByNickname(member.nickname),
                      }}
                    >
                      {member.nickname[0]}
                    </S.PopupAvatarFallback>
                  )}
                </S.PopupAvatar>
                <S.PopupName>{member.nickname}</S.PopupName>
                {member.userId === myUserId && (
                  <S.PopupBadge>(나)</S.PopupBadge>
                )}
              </S.PopupItem>
            ))}
          </S.PopupList>
        </S.Popup>,
        document.body
      )
    : null;

  return (
    <S.Wrapper ref={wrapperRef} onClick={handleToggle}>
      {(
        [
          { Container: S.ListPc, max: MAX_PC },
          { Container: S.ListTablet, max: MAX_TABLET },
        ] as const
      ).map(({ Container, max }) => (
        <Container key={max}>
          {members.slice(0, max).map((member) => (
            <S.MemberIcon key={member.id}>
              {member.profileImageUrl ? (
                <Image
                  src={member.profileImageUrl}
                  alt={member.nickname}
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <S.MemberIconFallback
                  style={{
                    background: getProfileColorByNickname(member.nickname),
                  }}
                >
                  {member.nickname[0]}
                </S.MemberIconFallback>
              )}
            </S.MemberIcon>
          ))}
          {members.length > max && (
            <S.MemberIconExtra>+{members.length - max}</S.MemberIconExtra>
          )}
        </Container>
      ))}
      {popup}
    </S.Wrapper>
  );
}
