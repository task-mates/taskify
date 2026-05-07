'use client';

import Input from '@/src/components/common/Input';
import * as S from '../styles';
import { DASHBOARD_COLORS } from '@/src/styles/profileColor';
import type { Dashboard } from '@/src/apis/dashboards/type';

type Props = {
  dashboard: Dashboard;
  title: string;
  color: string;
  isSaving: boolean;
  isUnchanged: boolean;
  isTitleEmpty: boolean;
  onTitleChange: (title: string) => void;
  onColorChange: (color: string) => void;
  onSave: () => void;
};

export default function DashboardInfoSection({
  dashboard,
  title,
  color,
  isSaving,
  isUnchanged,
  isTitleEmpty,
  onTitleChange,
  onColorChange,
  onSave,
}: Props) {
  return (
    <S.Card>
      <S.CardTitle>{dashboard.title}</S.CardTitle>

      <S.Label htmlFor="dashboard-title">대시보드 이름</S.Label>
      <Input
        id="dashboard-title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />

      <S.ColorPickerRow>
        {DASHBOARD_COLORS.map((c) => (
          <S.ColorCircle
            key={c}
            $color={c}
            $selected={color === c}
            onClick={() => onColorChange(c)}
            aria-label={`색상 ${c}`}
          >
            <S.CheckMark $visible={color === c}>✓</S.CheckMark>
          </S.ColorCircle>
        ))}
      </S.ColorPickerRow>

      <S.ChangeButton
        onClick={onSave}
        disabled={isSaving || isUnchanged || isTitleEmpty}
      >
        변경
      </S.ChangeButton>
    </S.Card>
  );
}
