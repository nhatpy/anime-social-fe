import { instance as axiosClient } from "../configs";
import { IHistoryListRequest, IListPagination, IListRequest } from "../interfaces";

export const historyListApi = {
    updateInHistory: async ({userId, mangaId, ...rest}: IHistoryListRequest) => {
        const url = `history-read/${userId}/read/${mangaId}`;
        return await axiosClient.patch(url, rest);
    },
    deleteFromHistory: async (deleteRequest: IListRequest) => {
        const url = `history-read/${deleteRequest.userId}/unread/${deleteRequest.mangaId}`;
        return await axiosClient.delete(url);
    },
    getHistoryPagination: async ({userId, ...params}: IListPagination) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `history-read/${userId}/get-paging?${queryString}`;
        return await axiosClient.get(url);
    }
}