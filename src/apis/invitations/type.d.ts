export interface Inviter {
  nickname: string;
  email: string;
  id: number;
}

export interface Invitee {
  nickname: string;
  email: string;
  id: number;
}

export interface InvitationDashboard {
  title: string;
  id: number;
}

export interface Invitation {
  id: number;
  inviter: Inviter;
  teamId: string;
  dashboard: InvitationDashboard;
  invitee: Invitee;
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
  cursorId: number;
  invitations: Invitation[];
}
