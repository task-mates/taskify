import instance from '@/src/apis/instance';
import {
  CreateCommentRequest,
  UpdateCommentRequest,
  Comment,
  GetCommentListRequest,
  GetCommentListResponse,
} from '@/src/apis/comments/type';

export const createComment = async (body: CreateCommentRequest) => {
  const { data } = await instance.post<Comment>('/comments', body);
  return data;
};

export const getCommentList = async (params: GetCommentListRequest) => {
  const { data } = await instance.get<GetCommentListResponse>('/comments', {
    params,
  });
  return data;
};

export const updateComment = async (
  commentId: number,
  body: UpdateCommentRequest
) => {
  const { data } = await instance.put<Comment>(`/comments/${commentId}`, body);
  return data;
};

export const removeComment = async (commentId: number) => {
  await instance.delete(`/comments/${commentId}`);
};
