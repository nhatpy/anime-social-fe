import { icons } from "../icons";
import { SortOptions } from "./enums";

export const mangaSortOptions: {
  value: string | SortOptions;
  label: React.ReactNode;
}[] = [
  {
    value: SortOptions.NAME,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.character} Tên truyện
      </div>
    ),
  },
  {
    value: SortOptions.CREATE_AT,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.new} Truyện mới
      </div>
    ),
  },
  {
    value: SortOptions.UPDATE_AT,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.time} Ngày cập nhật
      </div>
    ),
  },
  {
    value: SortOptions.FOLLOW,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.heart} Theo dõi
      </div>
    ),
  },
  {
    value: SortOptions.VIEW,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.eye} Lượt xem
      </div>
    ),
  },
  {
    value: SortOptions.NUMBER_OF_COMMENT,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.comment} Bình luận
      </div>
    ),
  },
  {
    value: SortOptions.NUMBER_OF_CHAPTER,
    label: (
      <div className="flex flex-row gap-2 items-center">
        {icons.chapter} Số chapter
      </div>
    ),
  },
];
