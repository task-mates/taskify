import { PROFILE_COLOR_VARS } from '@/src/styles/profileColor';

export function getProfileColorByNickname(nickname: string): string {
  if (typeof window === 'undefined') return '';
  const sum = nickname
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const varName = PROFILE_COLOR_VARS[sum % PROFILE_COLOR_VARS.length];
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}
