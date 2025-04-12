import { Button, Popover } from "antd";

import { icons } from "../utils/icons";
import { IManga } from "../interfaces";
import React from "react";
import { convertToLocalDate } from "../utils/helpers";
import { Link } from "react-router-dom";

type SlotWithXProps = {
  manga: IManga;
  handleDeleteFollowManga: (mangaId: string) => void;
};

export const SlotWithX: React.FC<SlotWithXProps> = ({
  manga,
  handleDeleteFollowManga,
}) => {
  const title = (
    <div className="w-[300px] text-lg font-medium">
      {manga.name.charAt(0).toUpperCase() + manga.name.slice(1)}
    </div>
  );
  const content = (
    <div className="w-[300px] flex flex-col gap-2">
      <div className="flex flex-row gap-1 w-full">
        <img
          src={manga.coverImage}
          alt={manga.slug}
          className="w-[40%] h-[180px] rounded"
        />
        <div className="flex flex-col gap-1 w-[60%]">
          <p>
            <span className="font-semibold text-blue-800">Thể loại: </span>
            {manga.categories
              .map(
                (category) =>
                  category.label.charAt(0).toUpperCase() +
                  category.label.slice(1)
              )
              .join(", ")}
          </p>
          <p>
            <span className="font-semibold text-blue-800">Tình trạng: </span>
            {manga.isDone ? "Đã hoàn thành" : "Đang tiến hành"}
          </p>
          <p>
            <span className="font-semibold text-blue-800">Lượt xem: </span>
            {manga.view}
          </p>
          <p>
            <span className="font-semibold text-blue-800">Bình luận: </span>
            {manga.chapters.reduce(
              (prev: number, current) => prev + (current.numberOfComment || 0),
              0
            )}
          </p>
          <p>
            <span className="font-semibold text-blue-800">Theo dõi: </span>
            {manga.follow}
          </p>
          <p>
            <span className="font-semibold text-blue-800">
              Lần cập nhật cuối:{" "}
            </span>
            {convertToLocalDate(manga.updateAt)}
          </p>
        </div>
      </div>
      <div>{manga.description}</div>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full gap-2">
      <div className="w-full h-48 items-center justify-center flex p-2 relative">
        <Button
          className="absolute top-2 right-2 z-10 bg-white text-red-500 rounded-full p-[6px] ant-btn-circle"
          onClick={() => handleDeleteFollowManga(manga.id)}
        >
          {icons.close}
        </Button>
        <img
          src={manga.coverImage}
          alt={manga.slug}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-fit p-1 bg-opacity-80 from-transparent bg-black text-white flex items-center justify-center">
          <div className="flex flex-row text-xs w-full p-1 opacity-70 gap-1">
            <span className="flex flex-row justify-center items-center">
              {icons.eye}
              {manga.view}
            </span>
            <span className="flex flex-row justify-center items-center">
              {icons.comment}
              {manga.chapters.reduce(
                (prev: number, current) =>
                  prev + (current.numberOfComment || 0),
                0
              )}
            </span>
            <span className="flex flex-row justify-center items-center">
              {icons.heart}
              {manga.follow}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 w-full h-fit p-2">
        <Popover content={content} title={title} trigger="hover">
          <Link to={`/manga/${manga.slug}`}>
            <h3 className="text-base text-left w-full font-medium">
              {manga.name.charAt(0) + manga.name.slice(1)}
            </h3>
          </Link>
        </Popover>
        <div className="flex flex-col w-full">
          {manga.chapters.slice(0, 2).map((chapter) => (
            <Link
              to={`/manga/${manga.slug}/${chapter.chapterNumber}`}
              key={chapter.chapterNumber}
            >
              <div className="flex flex-row justify-between items-center w-full">
                <span>Chapter {chapter.chapterNumber}</span>{" "}
                <span className="text-xs text-gray-400 italic">
                  {convertToLocalDate(chapter.updateAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
