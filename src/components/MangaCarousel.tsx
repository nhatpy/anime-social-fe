import React from "react";
import { IManga } from "../interfaces";
import { icons } from "../utils/icons";
import { convertToLocalDate } from "../utils/helpers";
import { Link } from "react-router-dom";

type MangaCarouselProps = {
  manga: IManga;
};

export const MangaCarousel: React.FC<MangaCarouselProps> = ({ manga }) => {
  return (
    <div className="w-[80%] h-52 flex items-center justify-center relative rounded-md">
      <img
        src={manga.coverImage}
        alt={manga.slug}
        className="absolute inset-0 w-full h-full object-cover rounded-md"
      />
      <div className="absolute bottom-0 rounded-b-md left-1/2 transform -translate-x-1/2 w-full h-[25%] bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
        <div className="flex flex-col text-sm w-full p-2">
          <Link to={`/manga/${manga.slug}`} className="w-full">
            <p className="text-center w-full truncate whitespace-nowrap">
              {manga.name}
            </p>
          </Link>
          <div className="flex w-full justify-center items-center flex-row">
            <p className="w-[40%]">
              Chapter{" "}
              {manga.chapters.length === 0
                ? 0
                : manga.chapters[0].chapterNumber}
            </p>
            <p className="flex flex-row w-[60%] justify-center items-center italic">
              <span className="mr-1">{icons.time}</span>
              {convertToLocalDate(manga.updateAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
