import { PASSWORD_MIN_LENGTH } from './constants';

type PasswordErrorParams = {
  value: string;
  touched: boolean;
};

export const hasProfileChanges = (params: {
  currentName: string;
  initialName: string;
  currentProfileImageUrl: string | null;
  initialProfileImageUrl: string | null;
  selectedProfileImage: File | null;
}) => {
  const {
    currentName,
    initialName,
    currentProfileImageUrl,
    initialProfileImageUrl,
    selectedProfileImage,
  } = params;

  const trimmedName = currentName.trim();
  const isNameChanged = trimmedName !== initialName.trim();
  const normalizedCurrentImage = currentProfileImageUrl ?? null;
  const normalizedInitialImage = initialProfileImageUrl ?? null;
  const isImageChanged =
    normalizedCurrentImage !== normalizedInitialImage ||
    selectedProfileImage !== null;

  // 이름, 프로필 이미지 중 하나라도 초기값과 다를 때
  const isProfileDirty = isNameChanged || isImageChanged;

  return {
    trimmedName,
    isProfileDirty,
  };
};

export const getNameError = (params: {
  value: string;
  message: string;
}) => {
  const { value, message } = params;
  return value.trim().length === 0 ? message : '';
};

export const getNewPasswordError = (
  params: PasswordErrorParams & { message: string }
) => {
  const { value, touched, message } = params;
  if (!touched || value.length === 0) {
    return '';
  }
  return value.length < PASSWORD_MIN_LENGTH ? message : '';
};

// 확인란에 입력이 시작된 뒤(둘 다 비어 있지 않을 때) 실시간으로 일치 여부 검사
export const getPasswordMismatchError = (params: {
  newPassword: string;
  confirmPassword: string;
  message: string;
}) => {
  const { newPassword, confirmPassword, message } = params;
  if (confirmPassword.length === 0 || newPassword.length === 0) {
    return '';
  }
  return newPassword !== confirmPassword ? message : '';
};

export const isPasswordChangeClientValid = (params: {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}) => {
  const { currentPassword, newPassword, confirmPassword } = params;

  return (
    currentPassword.length > 0 &&
    newPassword.length >= PASSWORD_MIN_LENGTH &&
    newPassword === confirmPassword
  );
};
