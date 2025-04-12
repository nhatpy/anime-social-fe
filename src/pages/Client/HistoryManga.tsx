import { message, Pagination } from "antd";
import { Link } from "react-router-dom";

import {
  CustomBreadcrumb,
  SlotHistory,
  TopManga,
  TopUser,
} from "../../components";
import { useEffect, useState } from "react";
import { IHistoryManga, IListPagination, IListRequest } from "../../interfaces";
import { useAuthStore } from "../../utils/stores";
import { useApi, useBoolean } from "../../hooks";
import { historyListApi } from "../../apis";

export const HistoryManga = () => {
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: "Lịch sử" },
  ];

  const [historyMangas, setHistoryMangas] = useState<IHistoryManga[]>([]);
  const { errorMessage, callApi: callHistoryMangaApis } = useApi<void>();
  const { currentUser } = useAuthStore();
  const [page, setPage] = useState(1);
  const pageSize = 16;
  const [total, setTotal] = useState(0);
  const { value: isHistoryListChanged, toggle: historyListChanged } =
    useBoolean(false);

  const handleDeleteHistoryManga = async (mangaId: string) => {
    await callHistoryMangaApis(async () => {
      const sendData: IListRequest = {
        userId: currentUser?.id || "",
        mangaId: mangaId,
      };
      const { data } = await historyListApi.deleteFromHistory(sendData);
      if (data) {
        message.success(data.message, 3);
        historyListChanged();
      }
    });
  };
  useEffect(() => {
    const fetchHistoryMangas = async () => {
      await callHistoryMangaApis(async () => {
        const sendData: IListPagination = {
          userId: currentUser?.id || "",
          page: page,
          size: pageSize,
        };
        const { data } = await historyListApi.getHistoryPagination(sendData);
        if (data) {
          setHistoryMangas(data.data);
          setTotal(data.totalItem);
        }
      });
    };
    fetchHistoryMangas();
  }, [isHistoryListChanged, page]);

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
            Lịch sử đọc truyện
          </h3>
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col gap-2 w-[70%]">
            <div className="grid grid-cols-4 gap-2 w-full h-full">
              {historyMangas.map((historyManga) => (
                <SlotHistory
                  key={historyManga.manga.id}
                  historyManga={historyManga}
                  handleDeleteHistoryManga={handleDeleteHistoryManga}
                />
              ))}
            </div>
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
          </div>
          <div className="flex flex-col w-[30%] gap-5">
            <TopManga />
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};
