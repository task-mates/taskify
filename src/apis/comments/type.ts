export interface CreateCommentRequest {
	content: string;
	cardId: number;
	columnId: number;
	dashboardId: number;
}

export interface Author {
	profileImageUrl: string | null;
	nickname: string;
	id: number;
}

export interface Comment {
	id: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	cardId: number;
	author: Author;
}

export interface GetCommentListRequest {
	size?: number;
	cursorId?: number;
	cardId: number;
}

export interface GetCommentListResponse {
	cursorId: number | null;
	comments: Comment[];
}

export interface UpdateCommentRequest {
	content: string;
}
