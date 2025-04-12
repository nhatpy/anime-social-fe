import { MangaStatus, SortOptions } from "../enums"

export const statusOptions: Record<MangaStatus, boolean | null> = {
    [MangaStatus.ALL]: null,
    [MangaStatus.TRUE]: true,
    [MangaStatus.FALSE]: false,
}

export const sortByOptions: Record<SortOptions, string | null> = {
    [SortOptions.UPDATE_AT]: "updateAt",
    [SortOptions.CREATE_AT]: "createAt",
    [SortOptions.FOLLOW]: "follow",
    [SortOptions.VIEW]: "view",
    [SortOptions.NUMBER_OF_COMMENT]: "numberOfComment",
    [SortOptions.NUMBER_OF_CHAPTER]: "numberOfChapter",
    [SortOptions.NAME]: "name",
    [SortOptions.ALL]: null,
}