import { IComment } from "."

export interface IChapter {
    id: string,
    chapterNumber: number,
    content: string[],
    mangaSlug: string,
    comments: IComment[],
    createdAt: Date,
    updatedAt: Date
}

export interface ISimpleChapter {
    chapterNumber: number,
    createdAt: Date,
    updatedAt: Date
}

export interface ICreateChapterRequest {
    mangaId: string,
    chapterNumber: number,
    content: string[]
}

export interface IUpdateChapterRequest extends Partial<ICreateChapterRequest> {
    formerChapterNumber: number
    mangaId: string
}

export interface IRequestWithChapterNumber {
    mangaId: string,
    chapterNumber: number
}