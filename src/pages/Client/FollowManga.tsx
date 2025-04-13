import { Link } from "react-router-dom";
import { Empty, message, Pagination, Skeleton } from "antd";

import {
  CustomBreadcrumb,
  HistoryManga,
  SlotWithX,
  TopManga,
  TopUser,
} from "../../components";
import { useAuthStore } from "../../utils/stores";
import { useEffect, useState } from "react";
import { IListPagination, IListRequest, IManga } from "../../interfaces";
import { useApi, useBoolean } from "../../hooks";
import { followListApi } from "../../apis";

export const FollowManga = () => {
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: "Theo dõi" },
  ];

  const { currentUser, isLogin } = useAuthStore();
  const [followMangas, setFollowMangas] = useState<IManga[]>([]);
  const {
    loading,
    errorMessage,
    callApi: callFollowMangaApis,
  } = useApi<void>();
  const [page, setPage] = useState(1);
  const pageSize = 16;
  const [total, setTotal] = useState(0);
  const { value: isFollowMangaListChanged, toggle: followMangaListChanged } =
    useBoolean(false);

  const handleDeleteFollowManga = async (mangaId: string) => {
    await callFollowMangaApis(async () => {
      const sendData: IListRequest = {
        userId: currentUser?.id || "",
        mangaId: mangaId,
      };
      const { data } = await followListApi.deleteFromFollowList(sendData);
      if (data) {
        message.success(data.message, 3);
        followMangaListChanged();
      }
    });
  };

  useEffect(() => {
    const fetchFollowManga = async () => {
      await callFollowMangaApis(async () => {
        const sendData: IListPagination = {
          userId: currentUser?.id || "",
          page: page,
          size: pageSize,
        };
        const { data } = await followListApi.getFollowListPagination(sendData);
        if (data) {
          setFollowMangas(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchFollowManga();
  }, [page, isFollowMangaListChanged]);

  useEffect(() => {
    if (errorMessage) {
      message.error(errorMessage, 3);
    }
  }, [errorMessage]);
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full gap-5">
          <CustomBreadcrumb items={items} />
        </div>
        <div className="w-full h-full">
          <h3 className="text-xl font-base text-blue-600 text-left">
            Truyện đang theo dõi
          </h3>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              {loading ? (
                <Skeleton
                  style={{ width: "300%", height: 180 }}
                  paragraph={{ rows: 5 }}
                  active
                />
              ) : followMangas.length === 0 ? (
                <div className="flex justify-center items-center w-full h-full col-span-4">
                  <Empty
                    image={Empty.PRESENTED_IMAGE_DEFAULT}
                    description={
                      <div>
                        <p className="text-lg text-blue-600 font-semibold">
                          Bạn chưa theo dõi truyện nào
                        </p>
                      </div>
                    }
                  />
                </div>
              ) : (
                followMangas.map((followManga) => (
                  <SlotWithX
                    key={followManga.id}
                    manga={followManga}
                    handleDeleteFollowManga={handleDeleteFollowManga}
                  />
                ))
              )}
            </div>
            {!loading && (
              <div className="flex justify-center items-center w-full pt-7">
                <Pagination
                  defaultCurrent={1}
                  total={total}
                  showSizeChanger={false}
                  pageSize={pageSize}
                  current={page}
                  onChange={(page) => setPage(page)}
                  className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col w-[30%] gap-5">
            {isLogin && (
              <>
                <HistoryManga />
              </>
            )}
            <TopManga />
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};
