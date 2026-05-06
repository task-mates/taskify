'use client';

import Link from 'next/link';
import LogoIcon from '@/public/images/icon-logo.svg';
import * as S from './styles';

export default function LandingHeader() {
  return (
    <S.Wrapper>
      <Link href="/">
        <LogoIcon />
      </Link>
      <S.NavLinks>
        <Link href="/login">로그인</Link>
        <Link href="/signup">회원가입</Link>
      </S.NavLinks>
    </S.Wrapper>
  );
}
