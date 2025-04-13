import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, message, Skeleton } from "antd";

import { icons } from "../../utils/icons";
import {
  CustomBreadcrumb,
  HistoryManga,
  TopManga,
  TopUser,
} from "../../components";
import { useAuthStore } from "../../utils/stores";
import { useApi, useBoolean } from "../../hooks";
import { followListApi, mangaApi } from "../../apis";
import { IListRequest, IManga } from "../../interfaces";
import { convertToLocalDate } from "../../utils/helpers";

export const MangaDetail = () => {
  const { "manga-slug": slug } = useParams();
  const {
    loading: loadingManga,
    errorMessage: mangaError,
    callApi: callMangaApis,
  } = useApi<void>();
  const {
    errorMessage: followError,
    loading,
    callApi: callFollowApis,
  } = useApi<void>();

  const [mangaDetail, setMangaDetail] = useState<IManga | null>(null);
  const [visibleChapters, setVisibleChapters] = useState(2);
  const { isLogin, currentUser } = useAuthStore();
  const { value: isFollow, setValue: setFollow } = useBoolean(false);
  const { value: isMangaDetailChanged, toggle: toggleMangaDetailChanged } =
    useBoolean(false);

  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: <Link to="/search">Thể loại</Link> },
    { title: <p>{mangaDetail?.name}</p> },
  ];

  const handleLoadMore = () => {
    setVisibleChapters((prev) => prev + 10);
  };

  const handleFollow = async () => {
    await callFollowApis(async () => {
      const sendData: IListRequest = {
        userId: currentUser?.id || "",
        mangaId: mangaDetail?.id || "",
      };
      const { data } = await followListApi.addToFollowList(sendData);
      if (data) {
        setFollow(true);
        message.success(data.message, 3);
        toggleMangaDetailChanged();
      }
    });
  };

  const handleUnfollow = async () => {
    await callFollowApis(async () => {
      const sendData: IListRequest = {
        userId: currentUser?.id || "",
        mangaId: mangaDetail?.id || "",
      };
      const { data } = await followListApi.deleteFromFollowList(sendData);
      if (data) {
        setFollow(false);
        message.success(data.message, 3);
        toggleMangaDetailChanged();
      }
    });
  };

  useEffect(() => {
    const fetchMangaDetail = async () => {
      await callMangaApis(async () => {
        const { data } = await mangaApi.getBySlug(slug as string);
        if (data) {
          setMangaDetail(data.data);
        }
      });
    };

    fetchMangaDetail();
    window.scrollTo({ top: 0 });
  }, [isMangaDetailChanged, slug]);

  useEffect(() => {
    const fetchFollowed = async () => {
      if (isLogin && mangaDetail) {
        await callFollowApis(async () => {
          const sendData: IListRequest = {
            userId: currentUser?.id || "",
            mangaId: mangaDetail?.id || "",
          };
          const { data } = await followListApi.checkFollowed(sendData);
          if (data) {
            setFollow(data);
          }
        });
      }
    };
    fetchFollowed();
  }, [mangaDetail]);

  useEffect(() => {
    if (mangaError) message.error(mangaError, 3);
    if (followError) message.error(followError, 3);
  }, [followError, mangaError]);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-2">
        <div className="flex flex-col justify-center w-full gap-5">
          <CustomBreadcrumb items={items} />
        </div>

        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-full gap-2">
            {loadingManga || !mangaDetail ? (
              <>
                <Skeleton active paragraph={{ rows: 2 }} />
                <div className="flex gap-5">
                  <Skeleton.Image style={{ width: 250, height: 300 }} />
                  <div className="flex-1">
                    <Skeleton active paragraph={{ rows: 6 }} />
                    <div className="mt-4">
                      <Skeleton.Button active style={{ width: 120 }} />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton active paragraph={{ rows: 4 }} />
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col w-full h-fit-content justify-center items-center">
                  <h3 className="text-2xl text-[22px] uppercase font-semibold">
                    {mangaDetail.name}
                  </h3>
                  <p className="text-sm italic text-gray-500">
                    Lần cập nhật cuối:{" "}
                    {convertToLocalDate(mangaDetail.updateAt)}
                  </p>
                </div>

                <div className="flex flex-row w-full justify-between">
                  <div className="flex flex-col w-[29%] gap-2">
                    <img
                      src={mangaDetail.coverImage}
                      alt={mangaDetail.slug}
                      className="w-[250px] h-[300px] rounded-md shadow-md"
                    />
                  </div>

                  <div className="flex flex-col w-[69%] gap-2 text-gray-500 text-lg">
                    <div className="flex flex-row gap-2 w-full">
                      <p className="flex w-[30%] items-center gap-1">
                        {icons.user}Tác giả
                      </p>
                      <p className="w-[70%]">{mangaDetail.authorName}</p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <p className="flex w-[30%] items-center gap-1">
                        {icons.status}Tình trạng
                      </p>
                      <p className="w-[70%]">
                        {mangaDetail.isDone
                          ? "Đã hoàn thành"
                          : "Đang tiến hành"}
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <p className="flex w-[30%] items-center gap-1">
                        {icons.tag}Thể loại
                      </p>
                      <p className="w-[70%]">
                        {mangaDetail.categories
                          .map(
                            (c) =>
                              c.label.charAt(0).toUpperCase() + c.label.slice(1)
                          )
                          .join(", ")}
                      </p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <p className="flex w-[30%] items-center gap-1">
                        {icons.eye}Lượt xem
                      </p>
                      <p className="w-[70%]">{mangaDetail.view}</p>
                    </div>

                    <div className="flex flex-row gap-2 w-full">
                      <p className="flex w-[30%] items-center gap-1">
                        {icons.description}Mô tả
                      </p>
                      <p className="w-[70%]">{mangaDetail.description}</p>
                    </div>

                    <div className="flex flex-row w-full gap-5">
                      <Button
                        className={`flex items-center gap-2 p-4 text-base rounded-md text-white hover:!bg-white transition-all duration-300 ${
                          isFollow ? "bg-red-500" : "bg-blue-500"
                        }`}
                        loading={loading}
                        onClick={isFollow ? handleUnfollow : handleFollow}
                        disabled={!isLogin}
                      >
                        {icons.heart}
                        {isFollow ? "Hủy theo dõi" : "Theo dõi"}
                      </Button>
                      <p>
                        <span className="font-bold">{mangaDetail.follow}</span>{" "}
                        người đang theo dõi
                      </p>
                    </div>

                    <div className="flex flex-row w-full gap-2">
                      <Link
                        to={`/manga/${mangaDetail.slug}/${
                          mangaDetail.chapters?.[
                            mangaDetail.chapters.length - 1
                          ]?.chapterNumber || 1
                        }`}
                      >
                        <Button className="w-fit p-4 text-white bg-amber-500">
                          Đọc từ đầu
                        </Button>
                      </Link>
                      <Link
                        to={`/manga/${mangaDetail.slug}/${
                          mangaDetail.chapters?.[0]?.chapterNumber || 1
                        }`}
                      >
                        <Button className="w-fit p-4 text-white bg-amber-500">
                          Đọc mới nhất
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-white w-full mx-auto">
                  <div className="flex items-center border-b pb-2 mb-2">
                    <span className="font-semibold flex items-center gap-2">
                      {icons.book} Danh sách chương
                    </span>
                  </div>

                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="p-2">Thứ tự</th>
                        <th className="p-2">Ngày cập nhật</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mangaDetail.chapters
                        ?.slice(0, visibleChapters)
                        .map((chapter) => (
                          <tr
                            key={chapter.chapterNumber}
                            className="border-b text-sm"
                          >
                            <td className="p-2">
                              <Link
                                to={`/manga/${mangaDetail.slug}/${chapter.chapterNumber}`}
                              >
                                Chapter {chapter.chapterNumber}
                              </Link>
                            </td>
                            <td className="p-2 text-gray-500 italic">
                              {convertToLocalDate(chapter.createAt)}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>

                  {mangaDetail.chapters &&
                    visibleChapters < mangaDetail.chapters.length && (
                      <div className="flex justify-center mt-4">
                        <Button
                          type="link"
                          onClick={handleLoadMore}
                          icon={
                            <span className="text-blue-500">{icons.more}</span>
                          }
                        >
                          Xem thêm
                        </Button>
                      </div>
                    )}
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col w-[40%] gap-5">
            {isLogin && <HistoryManga />}
            <TopManga />
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};
