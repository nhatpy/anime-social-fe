import { instance as axiosClient } from "../configs";
import { ILoginRequest, IRegisterRequest, IResetPasswordRequest, IToken, IVerifyEmailRequest } from "../interfaces";

export const authenticationApi = {
    login: async (loginRequest: ILoginRequest) => {
        return await axiosClient.post('/auth/login', loginRequest);
    },
    register: async (registerRequest: IRegisterRequest) => {
        return await axiosClient.post('/auth/register', registerRequest);
    },
    verifyToken: async (tokenRequest: IToken) => {
        return await axiosClient.post('/auth/verify-token', tokenRequest);
    },
    logout: async (tokenRequest: IToken) => {
        return await axiosClient.post('/auth/logout', tokenRequest);
    },
    verifyEmail: async (verifyEmailRequest: IVerifyEmailRequest) => {
        return await axiosClient.post('/auth/send-verify-email', verifyEmailRequest);
    },
    resetPassword: async (resetPasswordRequest: IResetPasswordRequest) => {
        const sendData = {
            newPassword : resetPasswordRequest.newPassword,
        }
        const url = `/auth/reset-password?id=${resetPasswordRequest.userId}`;
        return await axiosClient.post(url, sendData);
    }
}