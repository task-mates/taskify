'use client';

import Image from 'next/image';
import * as S from './styles';

export default function LandingHeader() {
  return (
    <S.Header>
      <S.HdInner>
        <S.LogoBox>
          <Image
            src="/images/logo.svg"
            alt="TASKIFY 로고"
            width={186}
            height={48}
          />
        </S.LogoBox>

        <S.Util>
          <S.UtilLink href="/login">로그인</S.UtilLink>
          <S.UtilLink href="/signup">회원가입</S.UtilLink>
        </S.Util>
      </S.HdInner>
    </S.Header>
  );
}
