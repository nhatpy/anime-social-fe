import { instance as axiosClient } from "../configs";
import { IListPagination, IListRequest } from "../interfaces";

export const followListApi = {
    addToFollowList: async (addRequest: IListRequest) => {
        const url = `/follow/${addRequest.userId}/${addRequest.mangaId}`;
        return await axiosClient.post(url, addRequest);
    },
    deleteFromFollowList: async (deleteRequest: IListRequest) => {
        const url = `/follow/${deleteRequest.userId}/delete/${deleteRequest.mangaId}`;
        return await axiosClient.delete(url);
    },
    getFollowListPagination: async ({userId, ...params}: IListPagination) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `follow/${userId}/get-paging/?${queryString}`;
        return await axiosClient.get(url);
    }
}