import instance from '@/src/apis/instance';
import {
  CreateCardRequest,
  UpdateCardRequest,
  Card,
  GetCardListRequest,
  GetCardListResponse,
} from '@/src/apis/cards/type';

export const cardsApi = {
  create: async (body: CreateCardRequest) => {
    const { data } = await instance.post<Card>('/cards', body);
    return data;
  },

  getList: async (params: GetCardListRequest) => {
    const { data } = await instance.get<GetCardListResponse>('/cards', {
      params,
    });
    return data;
  },

  update: async (cardId: number, body: UpdateCardRequest) => {
    const { data } = await instance.put<Card>(`/cards/${cardId}`, body);
    return data;
  },

  getById: async (cardId: number) => {
    const { data } = await instance.get<Card>(`/cards/${cardId}`);
    return data;
  },

  remove: async (cardId: number) => {
    await instance.delete(`/cards/${cardId}`);
  },
};
