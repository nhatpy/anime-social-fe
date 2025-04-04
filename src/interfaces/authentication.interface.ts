import { IUser } from ".";

export interface IAuthentication { 
    token: string,
    expiredTime: number,
    user: IUser
}

export interface ILoginRequest {
    email: string,
    password: string
}

export interface IRegisterRequest {
    email: string,
    password: string,
    fullName: string
}

export interface IRegisterWithForm extends IRegisterRequest {
    confirmPassword: string
}

export interface IToken {
    token: string
}

export interface IVerifyEmailRequest {
    email: string,
}

export interface IResetPasswordRequest {
    userId: string,
    newPassword: string,
}