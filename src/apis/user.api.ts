import { instance as axiosClient } from "../configs";
import { IPaginationRequest, IUpdateUserRequest } from "../interfaces";

export const authenticationApi = {
    getPagination: async (params: IPaginationRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `/user/get-paging?${queryString}`;
        return await axiosClient.get(url);
    },
    getById: async (userId: string) => {
        return await axiosClient.get(`/user/get/${userId}`);
    },
    updateUser: async ({id, ...rest}: IUpdateUserRequest) => {
        const url = `/user/update/${id}`;
        return await axiosClient.patch(url, rest);
    },
    deleteUser: async (userId: string) => {
        return await axiosClient.delete(`/user/delete/${userId}`);
    },
    currentUser: async () => {
        return await axiosClient.get('/user/current');
    },
    warningUser: async (userId: string) => {
        return await axiosClient.patch(`/user/warning/${userId}`);
    },
    getTopUser: async () => {
        return await axiosClient.get('/user/get-top');
    },
}