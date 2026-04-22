import { UserSummary, DashboardSummary } from "@/src/apis/common/type";

export interface CreateDashboardInvitationRequest {
  email: string;
}

export interface DashboardInvitationResponse {
  id: number;
  teamId: string;
  inviter: UserSummary;
  invitee: UserSummary;
  dashboard: DashboardSummary;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardInvitationListResponse {
  totalCount: number;
  invitations: DashboardInvitationResponse[];
}

export interface GetInvitationListRequest {
  page?: number;
  size?: number;
}
