import { Card, List, Skeleton } from "antd";

import { icons } from "../utils/icons";
import { useEffect, useState } from "react";
import { IUser } from "../interfaces";
import { useApi } from "../hooks";
import { userApi } from "../apis";

export const TopUser = () => {
  const [topUsers, setTopUsers] = useState<IUser[]>([]);
  const { loading, callApi: callUserApi } = useApi<void>();

  useEffect(() => {
    const fetchTopUsers = async () => {
      await callUserApi(async () => {
        const { data } = await userApi.getTopUser();
        if (data) {
          setTopUsers(data.data);
        }
      });
    };
    fetchTopUsers();
  }, []);
  return (
    <Card
      title="Top Thành Viên"
      style={{ width: "100%" }}
      styles={{ body: { padding: "16px" } }}
      className="shadow-md"
    >
      {loading || !topUsers ? (
        <Skeleton active paragraph={{ rows: 3 }} className="w-full" />
      ) : (
        <List
          dataSource={topUsers}
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
                  src={item.avatar}
                  alt={item.email}
                  className="w-10 h-10 rounded object-cover"
                />
                <div className="w-full">
                  <p className="font-medium truncate w-40">{item.fullName}</p>
                  <p className="text-sm text-gray-500 flex items-center">
                    <span className="mr-1 text-pink-600">{icons.diamond}</span>
                    {Number(item.wallet) / 50}
                  </p>
                </div>
              </div>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
