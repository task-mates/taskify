'use client';

import LogoIcon from '@/public/images/logo.svg';
import * as S from './styles';

export default function LandingHeader() {
  return (
    <S.Header>
      <S.HdInner>
        <S.LogoBox>
          <LogoIcon />
        </S.LogoBox>

        <S.Util>
          <S.UtilLink href="/login">로그인</S.UtilLink>
          <S.UtilLink href="/signup">회원가입</S.UtilLink>
        </S.Util>
      </S.HdInner>
    </S.Header>
  );
}
