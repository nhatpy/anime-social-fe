import { instance as axiosClient } from "../configs";
import { IGetNotificationRequest } from "../interfaces";

export const authenticationApi = {
    getPagination: async ({userId, ...params}: IGetNotificationRequest) => {
        const queryString = new URLSearchParams(
            Object.entries(params).reduce((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {} as Record<string, string>)
        ).toString();
        const url = `notification/${userId}?${queryString}`;
        return await axiosClient.get(url);
    }
}