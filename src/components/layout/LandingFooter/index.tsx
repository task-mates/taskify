'use client';

import GitHubIcon from '@/src/components/icons/icon-github.svg';
import LogoIcon from '@/public/images/logo.svg';
import * as S from './styles';

export default function LandingFooter() {
  return (
    <S.Footer>
      <S.FtInner>
        <S.LogoBox>
          <LogoIcon />
        </S.LogoBox>
        <S.InfoGroup>
          <S.FooterUtil>
            <S.FooterUtilLink href="#">Privacy Policy</S.FooterUtilLink>
            <S.FooterUtilLink href="/faq">FAQ</S.FooterUtilLink>
          </S.FooterUtil>
          <S.SnsArea>
            <S.SnsLink
              href="https://github.com/task-mates/taskify"
              target="_blank"
            >
              <GitHubIcon />
            </S.SnsLink>
          </S.SnsArea>
        </S.InfoGroup>
      </S.FtInner>
    </S.Footer>
  );
}
