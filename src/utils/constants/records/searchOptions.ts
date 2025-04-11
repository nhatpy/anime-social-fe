import { MangaStatus } from "../enums"

export const statusOptions: Record<MangaStatus, boolean | null> = {
    [MangaStatus.ALL]: null,
    [MangaStatus.COMPLETED]: true,
    [MangaStatus.ONGOING]: false,
}

export const sortByOptions: Record<string, string> = {
    "Ngày cập nhật": "updateAt",
    "Truyện mới": "createAt",
    "Top ngày": "topDay",
    "Theo dõi": "follow",
    "Bình luận": "numberOfComment",
    "Số chapter": "numberOfChapter",
}