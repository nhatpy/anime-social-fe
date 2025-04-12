import { MangaStatus } from "./enums";

export const mangaStatusOptions: { value: string | MangaStatus; label: string }[] = [
    { value: "", label: "Tất cả" },
    { value: MangaStatus.TRUE, label: "Hoàn thành" },
    { value: MangaStatus.FALSE, label: "Đang tiến hành" },
  ];