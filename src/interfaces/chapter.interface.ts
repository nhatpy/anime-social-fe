export interface IChapter {
    id: string,
    chapterNumber: number,
    content: string[],
    mangaSlug: string,
    numberOfComment: number,
    createAt: Date,
    updateAt: Date
}

export interface ISimpleChapter {
    chapterNumber: number,
    createAt: Date,
    updateAt: Date
}

export interface ICreateChapterRequest {
    mangaSlug: string,
    chapterNumber: number,
    content: string[]
}

export interface IUpdateChapterRequest extends Partial<ICreateChapterRequest> {
    mangaSlug: string,
    chapterNumber: number,
}

export interface IRequestWithChapterNumber {
    mangaSlug: string,
    chapterNumber: number
}

export interface IChapterFormData {
    chapterNumber: number,
    images: string[]
}