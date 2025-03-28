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