'use client';

import { useEffect, useRef, useState } from 'react';
import * as S from './styles';
import Card from '../Card';
import Confirm from '@/src/components/Confirm';
import ColumnEditModal from '@/src/components/modals/ColumnEditModal';
import { columnsApi } from '@/src/apis/columns';
import type { Card as CardInfo } from '@/src/apis/cards/type';
import PlusIcon from '@/src/components/icons/icon-plus.svg';
import SettingIcon from '@/src/components/icons/icon-setting.svg';
import EditIcon from '@/src/components/icons/icon-edit.svg';
import DeleteIcon from '@/src/components/icons/icon-delete.svg';
import ChevronDownIcon from '@/src/components/icons/icon-chevron-down.svg';
import ChevronUpIcon from '@/src/components/icons/icon-chevron-up.svg';

type ColumnSectionProps = {
  columnId: number;
  title: string;
  totalCount: number;
  cards: CardInfo[];
  onUpdated?: () => void;
};

export default function ColumnSection({
  columnId,
  title,
  totalCount,
  cards,
  onUpdated,
}: ColumnSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = async () => {
    try {
      await columnsApi.remove(columnId);
      onUpdated?.();
    } catch {
      alert('칼럼 삭제에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <S.Section>
      <S.Header>
        <S.TitleGroup>
          <S.Title>{title}</S.Title>
          <S.Count>{totalCount}</S.Count>
        </S.TitleGroup>
        <S.Setting ref={menuRef}>
          <S.SettingButton
            type="button"
            aria-label="칼럼 설정"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            <SettingIcon aria-hidden="true" />
          </S.SettingButton>

          {isMenuOpen && (
            <S.ActionButtonPopup>
              <S.ActionButtonList>
                <S.ActionButtonItem>
                  <S.ActionButton
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsEditModalOpen(true);
                    }}
                  >
                    <EditIcon />
                    수정하기
                  </S.ActionButton>
                </S.ActionButtonItem>
                <S.ActionButtonItem>
                  <S.ActionButton
                    type="button"
                    $variant="delete"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsDeleteConfirmOpen(true);
                    }}
                  >
                    <DeleteIcon />
                    삭제하기
                  </S.ActionButton>
                </S.ActionButtonItem>
              </S.ActionButtonList>
            </S.ActionButtonPopup>
          )}

          <S.ArrowButton
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? '접기' : '펼치기'}
            type="button"
          >
            {isOpen ? (
              <ChevronUpIcon width={24} height={24} aria-hidden="true" />
            ) : (
              <ChevronDownIcon width={24} height={24} aria-hidden="true" />
            )}
          </S.ArrowButton>
        </S.Setting>
      </S.Header>

      <S.CardList $isOpen={isOpen}>
        <S.AddButton>
          <S.IconContainer>
            <PlusIcon aria-hidden="true" />
          </S.IconContainer>
        </S.AddButton>
        {cards.length === 0 ? (
          <S.Empty>카드가 없습니다.</S.Empty>
        ) : (
          cards.map((card) => <Card key={card.id} card={card} />)
        )}
      </S.CardList>

      {isEditModalOpen && (
        <ColumnEditModal
          columnId={columnId}
          currentTitle={title}
          onClose={() => setIsEditModalOpen(false)}
          onEdited={() => {
            onUpdated?.();
          }}
        />
      )}

      {isDeleteConfirmOpen && (
        <Confirm
          title="칼럼을 삭제하시겠습니까?"
          description="칼럼 내 모든 카드도 함께 삭제됩니다."
          confirmText="삭제"
          onConfirm={() => void handleDelete()}
          onClose={() => setIsDeleteConfirmOpen(false)}
        />
      )}
    </S.Section>
  );
}
