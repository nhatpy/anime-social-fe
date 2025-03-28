import { IPaginationRequest, ISimpleChapter } from ".";

export interface IManga {
    id: string,
    name: string,
    slug: string,
    description: string,
    coverImage: string,
    view: number,
    follow: number,
    isDone: boolean,
    isActive: boolean,
    authorName: string,
    categoriesName: string[],
    chapters: ISimpleChapter[],
    createdAt: Date,
    updatedAt: Date
}

export interface ICreateMangaRequest {
    authorId: string,
    categoryIds: string[],
    name: string,
    slug: string,
    description: string,
    coverImg: string
    isDone: boolean
}

export interface IUpdateMangaRequest extends Partial<ICreateMangaRequest> {
    formerSlug: string
}

export interface IBulkActiveRequest {
    mangaIds: string[]
}

export interface IGetMangaPaginationRequest extends IPaginationRequest {
    type: number
}