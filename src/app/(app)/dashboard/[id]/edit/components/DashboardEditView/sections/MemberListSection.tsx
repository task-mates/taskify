'use client';

import Image from 'next/image';
import * as S from '../styles';
import { getProfileColorByNickname } from '@/src/utils/profileColor';
import type { Member } from '@/src/apis/members/type';

type Props = {
  members: Member[];
  myUserId: number | null;
  onRemoveMember: (memberId: number) => void;
};

export default function MemberListSection({
  members,
  myUserId,
  onRemoveMember,
}: Props) {
  return (
    <S.Card>
      <S.CardTitle>구성원</S.CardTitle>
      <S.ColumnLabel>이름</S.ColumnLabel>
      <S.ScrollList>
        {members.map((member) => (
          <S.ListRow key={member.id}>
            <S.MemberInfo>
              {member.profileImageUrl ? (
                <Image
                  src={member.profileImageUrl}
                  alt={member.nickname}
                  width={34}
                  height={34}
                  style={{ borderRadius: '50%', objectFit: 'cover' }}
                />
              ) : (
                <S.Avatar $bg={getProfileColorByNickname(member.nickname)}>
                  {member.nickname[0]}
                </S.Avatar>
              )}
              <S.MemberName>{member.nickname}</S.MemberName>
            </S.MemberInfo>
            {member.userId !== myUserId && (
              <S.OutlineButton onClick={() => onRemoveMember(member.id)}>
                삭제
              </S.OutlineButton>
            )}
          </S.ListRow>
        ))}
      </S.ScrollList>
    </S.Card>
  );
}
