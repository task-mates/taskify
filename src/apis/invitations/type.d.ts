import { UserSummary, DashboardSummary } from "@/src/apis/common/type";

export interface Invitation {
  id: number;
  inviter: UserSummary;
  teamId: string;
  dashboard: DashboardSummary;
  invitee: UserSummary;
  inviteAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInvitationRequest {
  inviteAccepted: boolean;
}

export interface GetInvitationListRequest {
  size?: number;
  cursorId?: number;
  title?: string;
}

export interface GetInvitationListResponse {
  cursorId: number | null;
  invitations: Invitation[];
}
