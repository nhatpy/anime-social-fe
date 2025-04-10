import { useEffect, useState } from "react";
import { Button, Card, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { IManga } from "../../interfaces";
import { useApi, useBoolean } from "../../hooks";
import { mangaApi } from "../../apis";
import { convertToLocalDate } from "../../utils/helpers";
import { icons } from "../../utils/icons";
import { UpdateMangaModal } from "../../components";

export const MangaCreateDetail = () => {
  const { "manga-slug": mangaName } = useParams();
  const { errorMessage, callApi: callMangaApis } = useApi<void>();
  const [manga, setManga] = useState<IManga | null>(null);
  const [visibleChapters, setVisibleChapters] = useState(5);
  const { value: isMangaChanged, toggle: toggleMangaChanged } =
    useBoolean(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchMangaData = async () => {
      await callMangaApis(async () => {
        const { data } = await mangaApi.getBySlug(mangaName || "");
        if (data) {
          setManga(data.data);
        }
      });
    };
    fetchMangaData();
  }, [isMangaChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card className="shadow-lg">
        <div className="flex gap-4">
          <img
            src={manga?.coverImage}
            alt={manga?.slug}
            className="w-40 h-60 object-cover rounded-md"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold">
                {manga?.name || "Tên truyện"}
              </h1>
              <Button
                type="text"
                className="p-0 px-1"
                onClick={() => setIsModalOpen(true)}
              >
                <span className="text-lg">{icons.create}</span>
              </Button>
            </div>
            <div className="space-y-2 text-gray-700">
              <p className="text-base leading-relaxed">
                {manga?.description || "Mô tả"}
              </p>
              <p className="text-base font-semibold text-gray-800">
                Tình trạng:{" "}
                <span className="text-blue-600 uppercase font-semibold">
                  {manga?.isDone ? "Đã hoàn thành" : "Còn sáng tác"}
                </span>
              </p>
              <p className="text-base font-semibold text-gray-800">
                Đã phát hành:{" "}
                <span className="text-blue-600 uppercase font-semibold">
                  {manga?.isActive ? "Rồi" : "Chưa"}
                </span>
              </p>

              <div className="text-base">
                <span className="font-semibold text-gray-800">Thể loại: </span>
                <span className="text-blue-600 uppercase font-semibold">
                  {manga?.categories
                    .map((category) => category.label)
                    .join(", ")}
                </span>
              </div>
              <p className="text-base font-semibold text-gray-800">
                Ngày đăng tải:{" "}
                <span className="text-blue-600 uppercase font-semibold">
                  {manga?.createAt
                    ? convertToLocalDate(manga.createAt)
                    : "Không xác định"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card
        className="shadow-lg"
        title="Danh sách Chapter"
        extra={
          <Link to={`/manga/create-manga/${manga?.slug}/create-chapter`}>
            <Button
              type="primary"
              className="!bg-blue-500 hover:!bg-blue-600 !text-white rounded-lg"
            >
              Thêm Chapter
            </Button>
          </Link>
        }
      >
        {manga?.chapters?.length === 0 && (
          <div className="text-center text-gray-500 text-base">
            Chưa có chapter nào
          </div>
        )}
        <ul className="space-y-2">
          {manga?.chapters.slice(0, visibleChapters).map((chapter) => (
            <li
              key={chapter.chapterNumber}
              className="flex justify-between items-center p-2 border-b"
            >
              <Link
                to={`/manga/create-manga/${manga?.slug}/create-chapter/${chapter.chapterNumber}`}
              >
                <span className="text-lg">Chương {chapter.chapterNumber}</span>
              </Link>
              <span className="text-sm text-gray-500">
                {convertToLocalDate(chapter.createAt)}
              </span>
            </li>
          ))}
        </ul>

        {visibleChapters < (manga?.chapters?.length ?? 0) && (
          <div className="text-center mt-3">
            <Button
              onClick={() =>
                setVisibleChapters(manga?.chapters.length ?? visibleChapters)
              }
            >
              Xem thêm
            </Button>
          </div>
        )}
      </Card>
      {manga && (
        <UpdateMangaModal
          isOpen={isModalOpen}
          handleCancel={handleCancel}
          manga={manga}
          toggleChanged={toggleMangaChanged}
        />
      )}
    </div>
  );
};
