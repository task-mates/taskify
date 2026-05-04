'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { membersApi } from '@/src/apis/members';
import type { Member } from '@/src/apis/members/type';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import * as S from './styles';

const MAX_PC = 4;
const MAX_TABLET = 2;

interface MemberProfilesProps {
  dashboardId: number;
}

export default function MemberProfiles({ dashboardId }: MemberProfilesProps) {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    membersApi
      .getList(dashboardId)
      .then(({ members }) => {
        setMembers(members);
      })
      .catch((err) => console.error(err));
  }, [dashboardId]);

  return (
    <S.Wrapper>
      <S.ListPc>
        {members.slice(0, MAX_PC).map((member) => (
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
                style={{ background: getProfileColorByNickname(member.nickname) }}
              >
                {member.nickname[0]}
              </S.MemberIconFallback>
            )}
          </S.MemberIcon>
        ))}
        {members.length > MAX_PC && (
          <S.MemberIconExtra>+{members.length - MAX_PC}</S.MemberIconExtra>
        )}
      </S.ListPc>

      <S.ListTablet>
        {members.slice(0, MAX_TABLET).map((member) => (
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
                style={{ background: getProfileColorByNickname(member.nickname) }}
              >
                {member.nickname[0]}
              </S.MemberIconFallback>
            )}
          </S.MemberIcon>
        ))}
        {members.length > MAX_TABLET && (
          <S.MemberIconExtra>+{members.length - MAX_TABLET}</S.MemberIconExtra>
        )}
      </S.ListTablet>
    </S.Wrapper>
  );
}
