import instance from '@/src/apis/instance';
import {
  CreateDashboardInvitationRequest,
  DashboardInvitationListResponse,
  DashboardInvitationResponse,
  GetInvitationListRequest,
} from '@/src/apis/dashboard-invitations/type';

export const createDashboardInvitation = async (
  dashboardId: number,
  body: CreateDashboardInvitationRequest
) => {
  const { data } = await instance.post<DashboardInvitationResponse>(
    `/dashboards/${dashboardId}/invitations`,
    body
  );
  return data;
};

export const getDashboardInvitationList = async (
  dashboardId: number,
  params: GetInvitationListRequest
) => {
  const { data } = await instance.get<DashboardInvitationListResponse>(
    `/dashboards/${dashboardId}/invitations`,
    {
      params: {
        navigationMethod: 'infiniteScroll',
        ...params,
      },
    }
  );
  return data;
};

export const cancelDashboardInvitation = async (
  dashboardId: number,
  invitationId: number
) => {
  await instance.delete(
    `/dashboards/${dashboardId}/invitations/${invitationId}`
  );
};
