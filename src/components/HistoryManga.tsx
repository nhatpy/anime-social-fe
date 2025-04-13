import { Link } from "react-router-dom";
import { Card, List, Skeleton } from "antd";

import { useEffect, useState } from "react";
import { IHistoryManga, IListPagination } from "../interfaces";
import { useApi } from "../hooks";
import { useAuthStore } from "../utils/stores";
import { historyListApi } from "../apis";

export const HistoryManga = () => {
  const [historyMangas, setHistoryMangas] = useState<IHistoryManga[]>([]);
  const { loading, callApi: callHistoryMangaApis } = useApi<void>();
  const { currentUser } = useAuthStore();

  useEffect(() => {
    const fetchHistoryMangas = async () => {
      await callHistoryMangaApis(async () => {
        const sendData: IListPagination = {
          userId: currentUser?.id || "",
          page: 1,
          size: 5,
        };
        const { data } = await historyListApi.getHistoryPagination(sendData);
        if (data) {
          setHistoryMangas(data.data);
        }
      });
    };
    fetchHistoryMangas();
  }, []);
  return (
    <Card
      title="Truyện Vừa Đọc"
      extra={
        <Link to={"/history"} className="text-sm italic text-gray-500">
          Xem tất cả
        </Link>
      }
      style={{ width: "100%" }}
      styles={{ body: { padding: "16px" } }}
    >
      {loading || !historyMangas ? (
        <Skeleton active paragraph={{ rows: 3 }} className="w-full" />
      ) : (
        <List
          dataSource={historyMangas}
          renderItem={(item, index) => (
            <List.Item className="flex items-center border-b gap-2 w-full">
              <span
                className={`font-bold text-lg ${
                  index < 3 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {index + 1}
              </span>
              <div className="flex items-center space-x-2 flex-1">
                <img
                  src={item.manga.coverImage}
                  alt={item.manga.slug}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="w-full">
                  <Link to={`/manga/${item.manga.slug}`}>
                    <p className="font-medium truncate w-40">
                      {item.manga.name}
                    </p>
                  </Link>
                  <Link
                    to={`/manga/${item.manga.slug}/${item.lastReadAtChapter}`}
                  >
                    <p className="text-sm italic">
                      Tiếp tục đọc tại chapter {item.lastReadAtChapter}
                    </p>
                  </Link>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
