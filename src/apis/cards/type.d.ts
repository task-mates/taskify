export interface CreateCardRequest {
	assigneeUserId?: number;
	dashboardId: number;
	columnId: number;
	title: string;
	description: string;
	dueDate?: string;
	tags?: string[];
	imageUrl?: string;
}

export interface UpdateCardRequest {
	columnId?: number;
	assigneeUserId?: number | null;
	title?: string;
	description?: string;
	dueDate?: string | null;
	tags?: string[];
	imageUrl?: string | null;
}

export interface Assignee {
	profileImageUrl: string | null;
	nickname: string;
	id: number;
}

export interface Card {
	id: number;
	title: string;
	description: string;
	tags: string[];
	dueDate: string | null;
	assignee: Assignee | null;
	imageUrl: string | null;
	teamId: string;
	columnId: number;
	createdAt: string;
	updatedAt: string;
}

export interface GetCardListRequest {
	columnId: number;
	size?: number;
	cursorId?: number;
}

export interface GetCardListResponse {
	cursorId: number;
	totalCount: number;
	cards: Card[];
}
