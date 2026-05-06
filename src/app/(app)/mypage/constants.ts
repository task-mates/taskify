export const PROFILE_BOX_SIZE = '182px';
// 마이페이지 카드 공통 가로 최대 너비
export const MYPAGE_CARD_MAX_WIDTH = '672px';
export const PASSWORD_MIN_LENGTH = 8;

export const MYPAGE_MESSAGES = {
  fetchMeFailed: '내 정보 조회에 실패했습니다.',
  profileUpdateSuccess: '정보가 수정되었습니다.',
  profileUpdateFailed: '정보 수정에 실패했습니다.',
  nameRequired: '이름을 1자 이상 입력해주세요',
  passwordChangeSuccess: '비밀번호가 변경되었습니다.',
  passwordChangeFailed: '비밀번호 변경에 실패했습니다.',
  currentPasswordInvalid: '현재 비밀번호가 일치하지 않습니다',
  passwordConfirmMismatch: '비밀번호가 일치하지 않습니다.',
  passwordMinLength: '비밀번호는 8자 이상 입력해주세요',
} as const;
