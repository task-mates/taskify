import instance from '@/src/apis/instance';
import { GetMemberListResponse } from '@/src/apis/members/type';

export const membersApi = {
  getList: async (dashboardId: number, page?: number, size?: number) => {
    const { data } = await instance.get<GetMemberListResponse>('/members', {
      params: { dashboardId, page, size },
    });
    return data;
  },
  remove: async (memberId: number) => {
    await instance.delete(`/members/${memberId}`);
  },
};
