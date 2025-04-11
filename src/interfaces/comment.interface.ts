import { IPaginationRequest, IUser } from ".";

export interface IComment {
    id: string,
    content: string,
    user: IUser,
    chapterId: string,
    createAt: Date,
    updateAt: Date
}

export interface IPostCommentRequest {
    userId: string,
    chapterId: string,
    content: string
}

export interface IUpdateCommentRequest {
    id: string
    content?: string
}

export interface IGetPagingComment extends IPaginationRequest {
    chapterId: string
}