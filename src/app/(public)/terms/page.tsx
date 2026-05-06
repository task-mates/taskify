import { TERMS_LAST_UPDATED, TERMS_OF_SERVICE } from '@/src/lib/terms';
import * as S from './styles';

export default async function TermsPage() {
  return (
    <S.Container>
      <S.Card>
        <S.Header>
          <S.Title>이용약관</S.Title>
          <S.CloseLink href="/" aria-label="페이지 닫기">
            ×
          </S.CloseLink>
        </S.Header>

        <S.Content>{TERMS_OF_SERVICE}</S.Content>
        <S.UpdatedAt>최종 수정일: {TERMS_LAST_UPDATED}</S.UpdatedAt>
      </S.Card>
    </S.Container>
  );
}
