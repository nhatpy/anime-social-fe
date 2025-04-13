import { Card, List, Skeleton } from "antd";

import { icons } from "../utils/icons";
import { useEffect, useState } from "react";
import { IManga } from "../interfaces";
import { useApi } from "../hooks";
import { mangaApi } from "../apis";
import { Link } from "react-router-dom";

export const TopManga = () => {
  const [topMangas, setTopMangas] = useState<IManga[]>([]);
  const { loading, callApi: callMangaApis } = useApi<void>();

  useEffect(() => {
    const fetchTopMangas = async () => {
      await callMangaApis(async () => {
        const { data } = await mangaApi.getTopDayManga();
        if (data) {
          setTopMangas(data.data);
        }
      });
    };
    fetchTopMangas();
  }, []);
  return (
    <Card
      title="Top Truyện Trong Ngày"
      style={{ width: "100%" }}
      styles={{ body: { padding: "16px" } }}
      className="shadow-md"
    >
      {loading || !topMangas ? (
        <Skeleton active paragraph={{ rows: 3 }} className="w-full" />
      ) : (
        <List
          dataSource={topMangas}
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
                <div className="flex items-center space-x-2">
                  <img
                    src={item.coverImage}
                    alt={item.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <Link to={`/manga/${item.slug}`}>
                      <p className="font-medium truncate w-40">{item.name}</p>
                    </Link>
                    <p className="text-sm text-gray-500">
                      Chapter {item.chapters[0].chapterNumber}
                    </p>
                  </div>
                  <span className="flex items-center text-gray-500">
                    {icons.eye} {item.view}
                  </span>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
