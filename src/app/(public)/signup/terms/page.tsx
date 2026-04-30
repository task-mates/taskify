import { TERMS_LAST_UPDATED, TERMS_OF_SERVICE } from '@/src/lib/terms';
import * as S from './styles';

type TermsPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

const resolveCloseHref = (from: string | string[] | undefined) => {
  if (typeof from !== 'string') {
    return '/signup';
  }

  if (from === 'login') {
    return '/login';
  }

  return '/signup';
};

export default async function TermsPage({ searchParams }: TermsPageProps) {
  const { from } = searchParams ? await searchParams : {};
  const closeHref = resolveCloseHref(from);

  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>이용약관</S.Title>
          <S.CloseLink href={closeHref} aria-label="페이지 닫기">
            ×
          </S.CloseLink>
        </S.Header>

        <S.Content>{TERMS_OF_SERVICE}</S.Content>
        <S.UpdatedAt>최종 수정일: {TERMS_LAST_UPDATED}</S.UpdatedAt>
      </S.Card>
    </S.Container>
  );
}
