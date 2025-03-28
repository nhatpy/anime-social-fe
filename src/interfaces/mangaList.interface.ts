import { IManga, IPaginationRequest } from ".";

export interface IFollowList { 
    id: string,
    manga: IManga,
}

export interface IHistoryList {
    userId: string,
    lastReadAtDate: Date,
    lastReadAtChapter: number,
    manga: IManga
}

export interface IListRequest {
    userId: string,
    mangaId: string
}

export interface IListPagination extends IPaginationRequest{
    userId: string
}

export interface IHistoryListRequest extends IListRequest {
    readDate: Date,
    readChapter: number
}