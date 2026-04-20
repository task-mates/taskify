export interface CreateDashboardInvitationRequest {
  email: string;
}

export interface UserSummary {
  id: number;
  nickname: string;
  email: string;
}

export interface DashboardSummary {
  id: number;
  title: string;
}

export interface DashboardInvitation {
  id: number;
  teamId: string;

  inviter: UserSummary;
  invitee: UserSummary;
  dashboard: DashboardSummary;

  inviteAccepted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface DashboardInvitationList {
  totalCount: number;
  invitations: DashboardInvitation[];
}

export interface GetInvitationListRequest {
  cursorId?: number;
  page?: number;
  size?: number;
}
