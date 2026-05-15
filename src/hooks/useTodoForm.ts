'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import dayjs from 'dayjs';
import { ko } from 'date-fns/locale/ko';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { columnsApi } from '../apis/columns';
import { Member } from '@/src/apis/members/type';
import { Tag } from '@/src/types/tag';
import { getProfileColorByNickname } from '../utils/profileColor';
import { getTagColorByName } from '../utils/tagColor';
import { showToast } from '../utils/toast';

registerLocale('ko', ko);

type TodoFormData = {
  title: string;
  description: string;
  dueDate: string | null;
  tags: Tag[];
  selectedAssignee: Member | null;
  imageUrl: string | null;
};

type UseTodoFormProps = {
  columnId: number;
  onSubmit: (data: TodoFormData) => Promise<void>;
};

export function useTodoForm({ columnId, onSubmit }: UseTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const [members, setMembers] = useState<Member[]>([]);
  const [isAssigneeOpen, setIsAssigneeOpen] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState<Member | null>(null);
  const selectBoxRef = useRef<HTMLDivElement | null>(null);

  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<Tag[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);
  const [isTagOpen, setIsTagOpen] = useState(false);
  const tagBoxRef = useRef<HTMLDivElement | null>(null);
  const [openedTagMenu, setOpenedTagMenu] = useState<string | null>(null);

  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectBoxRef.current &&
        !selectBoxRef.current.contains(e.target as Node)
      ) {
        setIsAssigneeOpen(false);
      }

      if (tagBoxRef.current && !tagBoxRef.current.contains(e.target as Node)) {
        setIsTagOpen(false);
        setOpenedTagMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (previewImageUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const handleDateChange = (date: Date | null) => {
    setDueDate(date);
  };

  const handleClearAssignee = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setSelectedAssignee(null);
    setIsAssigneeOpen(false);
  };

  const selectedAssigneeBgColor = selectedAssignee
    ? getProfileColorByNickname(selectedAssignee.nickname)
    : '';

  const getAvatarText = (nickname: string) => {
    const trimmedNickname = nickname.trim();
    if (!trimmedNickname) return '';
    return trimmedNickname[0];
  };

  const handleAddTag = useCallback(
    (value = tagInput) => {
      const trimmedTag = value.trim();

      if (!trimmedTag) return;

      const existingOption = tagOptions.find((tag) => tag.name === trimmedTag);

      const newTag = existingOption ?? {
        name: trimmedTag,
        ...getTagColorByName(trimmedTag),
      };

      setTags((prev) =>
        prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
      );

      setTagOptions((prev) =>
        prev.some((tag) => tag.name === trimmedTag) ? prev : [...prev, newTag]
      );

      setTagInput('');
      setIsTagOpen(true);
    },
    [tagInput, tagOptions]
  );

  const handleRemoveTag = (targetTag: string) => {
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }

    if (e.key === 'Backspace' && !tagInput && tags.length > 0) {
      setTags((prev) => prev.slice(0, -1));
    }
  };

  const filteredTagOptions = tagInput.trim()
    ? tagOptions.filter((tag) => tag.name.includes(tagInput.trim()))
    : tagOptions;

  const shouldShowCreateOption =
    tagInput.trim() && !tagOptions.some((tag) => tag.name === tagInput.trim());

  const handleDeleteTagOption = (targetTag: string) => {
    setTagOptions((prev) => prev.filter((tag) => tag.name !== targetTag));
    setTags((prev) => prev.filter((tag) => tag.name !== targetTag));
    setOpenedTagMenu(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImageFile(file);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImageUrl(imageUrl);
  };

  const handleRemoveImage = () => {
    if (previewImageUrl?.startsWith('blob:')) {
      URL.revokeObjectURL(previewImageUrl);
    }

    setPreviewImageUrl(null);
    setSelectedImageFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let imageUrl: string | null = previewImageUrl;

    if (selectedImageFile) {
      try {
        const uploadedImage = await columnsApi.uploadCardImage(
          columnId,
          selectedImageFile
        );
        imageUrl = uploadedImage.imageUrl;
      } catch {
        showToast.error('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    await onSubmit({
      title,
      description,
      tags,
      dueDate: dueDate ? dayjs(dueDate).format('YYYY-MM-DD HH:mm') : null,
      selectedAssignee,
      imageUrl,
    });

    // try {
    //   await cardsApi.update(cardId, {
    //     columnId,
    //     title,
    //     description,
    //     tags: tags.map((tag) => tag.name),
    //     dueDate: dueDate ? dayjs(dueDate).format('YYYY-MM-DD HH:mm') : null,
    //     assigneeUserId: selectedAssignee ? selectedAssignee.userId : null,
    //     imageUrl,
    //   });

    //   showToast.success('카드가 수정되었습니다.');
    //   emitCardChanged(dashboardId);
    //   onSuccess();
    // } catch {
    //   showToast.error('카드 수정에 실패했습니다.');
    // }
  };

  return {
    // 상태
    title,
    setTitle,
    description,
    setDescription,
    dueDate,
    setDueDate,
    members,
    setMembers,
    isAssigneeOpen,
    setIsAssigneeOpen,
    selectedAssignee,
    setSelectedAssignee,
    selectedAssigneeBgColor,
    tagInput,
    setTagInput,
    tags,
    setTags,
    tagOptions,
    setTagOptions,
    isTagOpen,
    setIsTagOpen,
    openedTagMenu,
    setOpenedTagMenu,
    previewImageUrl,
    setPreviewImageUrl,
    selectedImageFile,
    // ref
    selectBoxRef,
    tagBoxRef,
    fileInputRef,
    // 핸들러
    handleSubmit,
    handleDateChange,
    handleClearAssignee,
    getAvatarText,
    handleAddTag,
    handleRemoveTag,
    handleTagKeyDown,
    handleDeleteTagOption,
    handleImageChange,
    handleRemoveImage,
    // 파생값
    filteredTagOptions,
    shouldShowCreateOption,
  };
}
