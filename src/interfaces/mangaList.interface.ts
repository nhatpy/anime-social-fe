import { IManga, IPaginationRequest } from ".";

export interface IFollowManga { 
    manga: IManga
}

export interface IHistoryManga {
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