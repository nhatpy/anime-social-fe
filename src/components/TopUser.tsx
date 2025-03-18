import { Card, List } from "antd";

import { icons } from "../utils/icons";
interface User {
  key: string;
  rank: string;
  avatar: string;
  name: string;
  amount: number;
}

const dataSource: User[] = [
  {
    key: "1",
    rank: "01",
    avatar: "/assets/images (1).jpg",
    name: "User 1",
    amount: 12,
  },
  {
    key: "2",
    rank: "02",
    avatar: "/assets/images (1).jpg",
    name: "User 2",
    amount: 23,
  },
  {
    key: "3",
    rank: "03",
    avatar: "/assets/images (1).jpg",
    name: "User 3",
    amount: 34,
  },
  {
    key: "4",
    rank: "04",
    avatar: "/assets/images (1).jpg",
    name: "User 4",
    amount: 54,
  },
  {
    key: "5",
    rank: "05",
    avatar: "/assets/images (1).jpg",
    name: "User 5",
    amount: 55,
  },
];

export const TopUser = () => {
  return (
    <Card
      title="Top Thành Viên"
      style={{ width: "100%" }}
      styles={{ body: { padding: "16px" } }}
    >
      <List
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item className="flex items-center border-b gap-2 w-full">
            <span
              className={`font-bold text-lg ${
                index < 3 ? "text-red-500" : "text-gray-500"
              }`}
            >
              {item.rank}
            </span>
            <div className="flex items-center space-x-2 flex-1">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-10 h-10 rounded object-cover"
              />
              <div className="w-full">
                <p className="font-medium truncate w-40">{item.name}</p>
                <p className="text-sm text-gray-500 flex items-center">
                  <span className="mr-1">{icons.diamond}</span>
                  {item.amount}
                </p>
              </div>
            </div>
          </List.Item>
        )}
      />
    </Card>
  );
};
