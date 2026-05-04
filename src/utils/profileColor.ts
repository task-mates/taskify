import { PROFILE_COLOR_VARS } from '@/src/styles/profileColor';

export function getProfileColorByNickname(nickname: string): string {
  const sum = nickname
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `var(${PROFILE_COLOR_VARS[sum % PROFILE_COLOR_VARS.length]})`;
}
