import { instance as axiosClient } from "../configs";
import { IPaginationRequest } from "../interfaces";

export const statisticApi = {
    getRevenues: async () => {
        return await axiosClient.get('/statistic/revenue');
    },
    getMangas: async (params: IPaginationRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `statistic/manga?${queryString}`;
        return await axiosClient.get(url);
    },
    getUsers: async (params: IPaginationRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `statistic/user?${queryString}`;
        return await axiosClient.get(url);
    },
    getMostPopularCategory: async () => {
        return await axiosClient.get('/statistic/most-popular-category');
    },
    getCount: async () => {
        return await axiosClient.get('/statistic/count');
    },
}