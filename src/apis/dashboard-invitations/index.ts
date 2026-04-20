import instance from "@/src/apis/instance";
import {
  CreateDashboardInvitationRequest,
  DashboardInvitationList,
  DashboardInvitation,
  GetInvitationListRequest,
} from "@/src/apis/dashboard-invitations/type";

export const dashboardInvitationsApi = {
  create: async (
    dashboardId: number,
    body: CreateDashboardInvitationRequest,
  ) => {
    const { data } = await instance.post<DashboardInvitation>(
      `/dashboards/${dashboardId}/invitations`,
      body,
    );
    return data;
  },

  getList: async (
    dashboardId: number,
    { ...params }: GetInvitationListRequest,
  ) => {
    const { data } = await instance.get<DashboardInvitationList>(
      `/dashboards/${dashboardId}/invitations`,
      {
        params: {
          navigationMethod: "infiniteScroll",
          ...params,
        },
      },
    );
    return data;
  },

  cancel: async (dashboardId: number, invitationId: number) => {
    await instance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`,
    );
  },
};
