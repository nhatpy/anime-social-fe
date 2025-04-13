export interface IUser {
    id: string,
    email: string,
    password: string,
    fullName: string,
    avatar: string,
    wallet: number,
    role: string[],
    isWarning: boolean,
    isBanned: boolean,
    createAt: Date,
    updateAt: Date
}

export interface IUpdateUserRequest {
    id: string,
    avatar?: string,
}