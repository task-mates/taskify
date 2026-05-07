import { TAG_COLOR_VARS } from '@/src/styles/tagColor';
import type { TagColor } from '@/src/types/tag';

export const getTagColorByName = (tagName: string): TagColor => {
  const sum = tagName
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  return TAG_COLOR_VARS[sum % TAG_COLOR_VARS.length];
};

//태그 이름 기준으로 항상 같은 색상을 반환하는 로직
export const TAG_PREVIEW_COLOR: TagColor = {
  backgroundColor: 'var(--color-gray-200)',
  color: '#333',
};
