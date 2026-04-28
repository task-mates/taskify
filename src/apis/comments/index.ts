import instance from "@/src/apis/instance";
import {
	CreateCommentRequest,
	UpdateCommentRequest,
	Comment,
	GetCommentListRequest,
	GetCommentListResponse,
} from "@/src/apis/comments/type";

export const commentsApi = {
	create: async (body: CreateCommentRequest) => {
		const { data } = await instance.post<Comment>("/comments", body);
		return data;
	},

	getList: async (params: GetCommentListRequest) => {
		const { data } = await instance.get<GetCommentListResponse>(
			"/comments",
			{
				params,
			},
		);
		return data;
	},

	update: async (commentId: number, body: UpdateCommentRequest) => {
		const { data } = await instance.put<Comment>(
			`/comments/${commentId}`,
			body,
		);
		return data;
	},

	remove: async (commentId: number) => {
		await instance.delete(`/comments/${commentId}`);
	},
};
