'use client';

import GitHubIcon from '@/src/components/icons/icon-github.svg';
import Image from 'next/image';
import * as S from './styles';

export default function LandingFooter() {
  return (
    <S.Footer>
      <S.FtInner>
        <S.LogoBox href="/">
          <Image
            src="/images/logo.svg"
            alt="TASKIFY 로고"
            width={186}
            height={48}
          />
        </S.LogoBox>
        <S.InfoGroup>
          <S.FooterUtil>
            <S.FooterUtilLink href="/terms">Terms of Service</S.FooterUtilLink>
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
