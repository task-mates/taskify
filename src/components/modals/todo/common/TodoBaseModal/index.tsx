import Modal from '@/src/components/Modal';
import { TodoBaseModalProps } from './type';
import * as S from './styles';
import CloseIcon from '@/src/components/icons/icon-close.svg';

export default function TodoBaseModal({
  onClose,
  title,
  labelId,
  badgeGroup,
  actionMenu,
  children,
  footerGroup,
  headerVariant = 'default',
  overlayVariant = 'default',
  layoutVariant = 'default',
}: TodoBaseModalProps) {
  return (
    <Modal
      onClose={onClose}
      labelledById={labelId}
      overlayVariant={overlayVariant}
    >
      <S.Container $variant={layoutVariant}>
        <S.Wrapper>
          <S.Header $variant={headerVariant}>
            <S.HeaderLeft>
              <S.TitleBox>
                <S.Title id={labelId}>{title}</S.Title>
              </S.TitleBox>
              {badgeGroup}
            </S.HeaderLeft>

            <S.HeaderRight>
              {actionMenu}
              <S.CloseButton
                type="button"
                onClick={onClose}
                aria-label="모달 닫기"
              >
                <CloseIcon />
              </S.CloseButton>
            </S.HeaderRight>
          </S.Header>

          <S.Content $variant={layoutVariant}>{children}</S.Content>

          {footerGroup && <S.Footer>{footerGroup}</S.Footer>}
        </S.Wrapper>
      </S.Container>
    </Modal>
  );
}
