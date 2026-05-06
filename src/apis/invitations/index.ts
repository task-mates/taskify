import instance from '@/src/apis/instance';
import {
  GetInvitationListRequest,
  GetInvitationListResponse,
  UpdateInvitationRequest,
  Invitation,
} from '@/src/apis/invitations/type';

export const updateInvitation = async (
  invitationId: number,
  body: UpdateInvitationRequest
) => {
  const { data } = await instance.put<Invitation>(
    `/invitations/${invitationId}`,
    body
  );
  return data;
};

export const getInvitationList = async (params?: GetInvitationListRequest) => {
  const { data } = await instance.get<GetInvitationListResponse>(
    '/invitations',
    { params }
  );
  return data;
};
