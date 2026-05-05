'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import ArrowIcon from '@/src/components/icons/icon-arrow.svg';
import ProfileBoxIcon from '@/src/components/icons/profile-box.svg';
import { putPassword } from '@/src/apis/auth';
import { usersApi } from '@/src/apis/users';
import { MYPAGE_MESSAGES, PROFILE_BOX_SIZE } from './constants';
import {
  getNameError,
  getNewPasswordError,
  getPasswordMismatchError,
  hasProfileChanges,
  isPasswordChangeClientValid,
} from './utils';
import * as S from './styles';

const useMyPageProfileState = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [initialEmail, setInitialEmail] = useState('');
  const [name, setName] = useState('');
  const [initialName, setInitialName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [initialProfileImageUrl, setInitialProfileImageUrl] = useState<
    string | null
  >(null);
  const [selectedProfileImage, setSelectedProfileImage] = useState<File | null>(
    null
  );
  const [previewProfileImageUrl, setPreviewProfileImageUrl] = useState<
    string | null
  >(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileSaveErrorMessage, setProfileSaveErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const nameErrorMessage = getNameError({
    value: name,
    message: MYPAGE_MESSAGES.nameRequired,
  });

  const { isProfileDirty: isProfileSaveEnabled } = hasProfileChanges({
    currentName: name,
    initialName,
    currentProfileImageUrl: profileImageUrl,
    initialProfileImageUrl,
    selectedProfileImage,
  });

  return {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    email,
    setEmail,
    initialEmail,
    setInitialEmail,
    name,
    setName,
    initialName,
    setInitialName,
    profileImageUrl,
    setProfileImageUrl,
    initialProfileImageUrl,
    setInitialProfileImageUrl,
    selectedProfileImage,
    setSelectedProfileImage,
    previewProfileImageUrl,
    setPreviewProfileImageUrl,
    isSavingProfile,
    setIsSavingProfile,
    profileSaveErrorMessage,
    setProfileSaveErrorMessage,
    fileInputRef,
    nameErrorMessage,
    isProfileSaveEnabled,
  };
};

const useMyPagePasswordState = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isNewPasswordTouched, setIsNewPasswordTouched] = useState(false);
  const [currentPasswordServerError, setCurrentPasswordServerError] =
    useState('');
  const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

  const newPasswordErrorMessage = getNewPasswordError({
    value: newPassword,
    touched: isNewPasswordTouched,
    message: MYPAGE_MESSAGES.passwordMinLength,
  });
  const passwordMismatchMessage = getPasswordMismatchError({
    newPassword,
    confirmPassword,
    message: MYPAGE_MESSAGES.passwordConfirmMismatch,
  });

  const currentPasswordErrorMessage = currentPasswordServerError;
  const isPasswordFieldsFilled =
    currentPassword.length > 0 &&
    newPassword.length > 0 &&
    confirmPassword.length > 0;

  return {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    setIsNewPasswordTouched,
    setCurrentPasswordServerError,
    isSubmittingPassword,
    setIsSubmittingPassword,
    newPasswordErrorMessage,
    passwordMismatchMessage,
    currentPasswordErrorMessage,
    isPasswordFieldsFilled,
  };
};

export default function MyPage() {
  const router = useRouter();
  const {
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    email,
    setEmail,
    initialEmail,
    setInitialEmail,
    name,
    setName,
    initialName,
    setInitialName,
    profileImageUrl,
    setProfileImageUrl,
    initialProfileImageUrl,
    setInitialProfileImageUrl,
    selectedProfileImage,
    setSelectedProfileImage,
    previewProfileImageUrl,
    setPreviewProfileImageUrl,
    isSavingProfile,
    setIsSavingProfile,
    profileSaveErrorMessage,
    setProfileSaveErrorMessage,
    fileInputRef,
    nameErrorMessage,
    isProfileSaveEnabled,
  } = useMyPageProfileState();
  const {
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    setIsNewPasswordTouched,
    setCurrentPasswordServerError,
    isSubmittingPassword,
    setIsSubmittingPassword,
    newPasswordErrorMessage,
    passwordMismatchMessage,
    currentPasswordErrorMessage,
    isPasswordFieldsFilled,
  } = useMyPagePasswordState();

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const me = await usersApi.getMe();
        setEmail(me.email);
        setInitialEmail(me.email);
        setName(me.nickname);
        setInitialName(me.nickname);
        setProfileImageUrl(me.profileImageUrl || null);
        setInitialProfileImageUrl(me.profileImageUrl || null);
      } catch {
        setProfileSaveErrorMessage(MYPAGE_MESSAGES.fetchMeFailed);
      }
    };

    void fetchMyInfo();
  }, [
    setEmail,
    setInitialEmail,
    setName,
    setInitialName,
    setProfileImageUrl,
    setInitialProfileImageUrl,
    setProfileSaveErrorMessage,
  ]);

  useEffect(() => {
    return () => {
      if (previewProfileImageUrl) {
        URL.revokeObjectURL(previewProfileImageUrl);
      }
    };
  }, [previewProfileImageUrl]);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
    setIsProfileMenuOpen(false);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedProfileImage(file);
    setPreviewProfileImageUrl(URL.createObjectURL(file));
    setIsProfileMenuOpen(false);
  };

  const handleImageDelete = () => {
    setSelectedProfileImage(null);
    setPreviewProfileImageUrl(null);
    setProfileImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setIsProfileMenuOpen(false);
  };

  const handleProfileSave = async () => {
    const { trimmedName } = hasProfileChanges({
      currentName: name,
      initialName,
      currentProfileImageUrl: profileImageUrl,
      initialProfileImageUrl,
      selectedProfileImage,
    });

    if (nameErrorMessage) {
      return;
    }

    try {
      setIsSavingProfile(true);
      setProfileSaveErrorMessage('');

      let nextProfileImageUrl = profileImageUrl;
      if (selectedProfileImage) {
        const uploaded = await usersApi.uploadMyImage(selectedProfileImage);
        nextProfileImageUrl = uploaded.profileImageUrl;
      }

      const updated = await usersApi.updateMe({
        nickname: trimmedName || initialName,
        profileImageUrl: nextProfileImageUrl ?? null,
      });

      setName(updated.nickname);
      setInitialName(updated.nickname);
      setEmail(updated.email);
      setInitialEmail(updated.email);
      setProfileImageUrl(updated.profileImageUrl || null);
      setInitialProfileImageUrl(updated.profileImageUrl || null);
      setSelectedProfileImage(null);
      setPreviewProfileImageUrl(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      window.alert(MYPAGE_MESSAGES.profileUpdateSuccess);
    } catch {
      setProfileSaveErrorMessage(MYPAGE_MESSAGES.profileUpdateFailed);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setCurrentPasswordServerError('');

    if (
      !isPasswordChangeClientValid({
        currentPassword,
        newPassword,
        confirmPassword,
      })
    ) {
      setIsNewPasswordTouched(true);
      return;
    }

    try {
      setIsSubmittingPassword(true);
      await putPassword({
        password: currentPassword,
        newPassword,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setIsNewPasswordTouched(false);
      window.alert(MYPAGE_MESSAGES.passwordChangeSuccess);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400 || status === 401) {
          setCurrentPasswordServerError(MYPAGE_MESSAGES.currentPasswordInvalid);
          return;
        }
      }
      window.alert(MYPAGE_MESSAGES.passwordChangeFailed);
    } finally {
      setIsSubmittingPassword(false);
    }
  };

  return (
    <S.Page>
      <S.TopBackWrap>
        <S.BackButton type="button" onClick={() => router.push('/dashboard')}>
          <S.BackIcon as={ArrowIcon} />
          돌아가기
        </S.BackButton>
      </S.TopBackWrap>

      <S.ProfileSection>
        <S.SectionTitle>프로필</S.SectionTitle>
        <S.HiddenFileInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <S.ProfileContent>
          <S.ProfileImageWrap>
            <S.ProfileImageButton
              type="button"
              onClick={() => setIsProfileMenuOpen((prev) => !prev)}
              $size={PROFILE_BOX_SIZE}
              aria-label="프로필 이미지 메뉴 열기"
            >
              {previewProfileImageUrl || profileImageUrl ? (
                <S.ProfilePreviewImage
                  src={previewProfileImageUrl || profileImageUrl || ''}
                  alt="프로필 이미지"
                />
              ) : (
                <S.ProfileIcon as={ProfileBoxIcon} />
              )}
            </S.ProfileImageButton>

            {isProfileMenuOpen ? (
              <S.ProfileMenu>
                <S.ProfileMenuButton
                  type="button"
                  onClick={handleImageButtonClick}
                >
                  사진 변경
                </S.ProfileMenuButton>
                <S.ProfileMenuButton
                  type="button"
                  onClick={handleImageDelete}
                  $danger
                >
                  사진 삭제
                </S.ProfileMenuButton>
              </S.ProfileMenu>
            ) : null}
          </S.ProfileImageWrap>

          <S.ProfileFormWrap>
            <S.ProfileFields $size={PROFILE_BOX_SIZE}>
              <S.Label>이메일</S.Label>
              <S.DisabledValue>{email}</S.DisabledValue>

              <S.Spacer />

              <S.Label htmlFor="name">이름</S.Label>
              <S.TextInput
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="이름을 입력해주세요"
              />
            </S.ProfileFields>

            <S.ErrorSpace>{nameErrorMessage || ' '}</S.ErrorSpace>
            <S.SaveButton
              type="button"
              onClick={handleProfileSave}
              disabled={
                isSavingProfile ||
                !isProfileSaveEnabled ||
                Boolean(nameErrorMessage)
              }
            >
              {isSavingProfile ? '저장 중' : '저장'}
            </S.SaveButton>
            <S.ErrorSpace>{profileSaveErrorMessage || ' '}</S.ErrorSpace>
          </S.ProfileFormWrap>
        </S.ProfileContent>
      </S.ProfileSection>

      <S.PasswordSection>
        <S.SectionTitle>비밀번호 변경</S.SectionTitle>
        <S.PasswordForm onSubmit={handlePasswordSubmit}>
          <S.Label htmlFor="currentPassword">현재 비밀번호</S.Label>
          <S.PasswordInput
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={(event) => {
              setCurrentPassword(event.target.value);
              setCurrentPasswordServerError('');
            }}
            placeholder="비밀번호 입력"
            $hasError={Boolean(currentPasswordErrorMessage)}
          />
          <S.ErrorSpace>{currentPasswordErrorMessage || ' '}</S.ErrorSpace>

          <S.Label htmlFor="newPassword">새 비밀번호</S.Label>
          <S.PasswordInput
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(event) => {
              const nextValue = event.target.value;
              setNewPassword(nextValue);
            }}
            onBlur={() => setIsNewPasswordTouched(true)}
            placeholder="새 비밀번호 입력"
            $hasError={
              Boolean(newPasswordErrorMessage) ||
              Boolean(passwordMismatchMessage)
            }
          />
          <S.ErrorSpace>
            {newPasswordErrorMessage || passwordMismatchMessage || ' '}
          </S.ErrorSpace>

          <S.Label htmlFor="confirmPassword">새 비밀번호 확인</S.Label>
          <S.PasswordInput
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(event) => {
              const nextValue = event.target.value;
              setConfirmPassword(nextValue);
            }}
            placeholder="새 비밀번호 입력"
            $hasError={Boolean(passwordMismatchMessage)}
          />
          <S.ErrorSpace>{passwordMismatchMessage || ' '}</S.ErrorSpace>

          <S.PasswordButton
            type="submit"
            disabled={
              isSubmittingPassword ||
              !isPasswordChangeClientValid({
                currentPassword,
                newPassword,
                confirmPassword,
              }) ||
              newPassword === currentPassword
            }
          >
            {isSubmittingPassword ? '비밀번호 변경 중' : '비밀번호 변경'}
          </S.PasswordButton>
        </S.PasswordForm>
      </S.PasswordSection>
    </S.Page>
  );
}
