import { Link } from "react-router-dom";
import { IHistoryManga } from "../interfaces";
import { icons } from "../utils/icons";
import { Button } from "antd";

type SlotHistoryProps = {
  historyManga: IHistoryManga;
  handleDeleteHistoryManga: (mangaId: string) => void;
};

export const SlotHistory: React.FC<SlotHistoryProps> = ({
  historyManga,
  handleDeleteHistoryManga,
}) => {
  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="w-full h-48 items-center justify-center flex p-2 relative">
        <img
          src={historyManga.manga.coverImage}
          alt={historyManga.manga.slug + "-" + historyManga.lastReadAtChapter}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-fit p-1 bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
          <Button
            type="text"
            onClick={() => handleDeleteHistoryManga(historyManga.manga.id)}
          >
            <div className="flex flex-row text-xs w-full p-1 opacity-70 gap-1 justify-center items-center">
              <span className="flex flex-row justify-center items-center font-bold gap-1 text-white hover:text-red-500">
                {icons.delete} Xóa
              </span>
            </div>
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full h-fit p-2">
        <Link to={`/manga/${historyManga.manga.slug}`}>
          <h3 className="text-base text-left w-full font-semibold">
            {historyManga.manga.name}
          </h3>
        </Link>
        <div className="flex flex-col justify-evenly items-center w-full">
          <div className="flex flex-row justify-between items-center w-full">
            <Link
              to={`/manga/${historyManga.manga.slug}/${historyManga.lastReadAtChapter}`}
            >
              <span className="text-xs">
                Đọc tiếp chapter {historyManga.lastReadAtChapter}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
