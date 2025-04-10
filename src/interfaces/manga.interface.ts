import { ICategoryOption, IPaginationRequest, ISimpleChapter } from ".";

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
    categories: ICategoryOption[],
    chapters: ISimpleChapter[],
    createAt: Date,
    updateAt: Date
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
    slug: string
}

export interface IBulkActiveRequest {
    mangaIds: string[]
}

export interface IGetMangaPaginationRequest extends IPaginationRequest {
    type: number
}

export interface ICreateMangaForm {
    categoryIds: string[];
    name: string;
    description: string;
    coverImg: string;
    isDone?: boolean;
}

export interface IGetMangaByAuthorIdRequest extends IPaginationRequest{
    authorId: string,
}