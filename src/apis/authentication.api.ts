import { instance as axiosClient } from "../configs";
import { ILoginRequest, IRegisterRequest } from "../interfaces";

export const authenticationApi = {
    login: async (loginRequest: ILoginRequest) => {
        return await axiosClient.post('/auth/login', loginRequest);
    },
    register: async (registerRequest: IRegisterRequest) => {
        return await axiosClient.post('/auth/register', registerRequest);
    },
    verifyToken: async (token: string) => {
        return await axiosClient.post('/auth/verify-token', token);
    },
    logout: async (token: string) => {
        return await axiosClient.post('/auth/logout', token);
    }
}