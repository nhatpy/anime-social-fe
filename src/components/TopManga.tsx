import { Table, Tabs, TabsProps } from "antd";

import { icons } from "../utils/icons";
interface Manga {
  key: string;
  rank: string;
  img: string;
  title: string;
  chapter: string;
  views: string;
}

const dataSource: Manga[] = [
  {
    key: "1",
    rank: "01",
    img: "/assets/images.jpg",
    title: "Bà Xã Nhà Tôi Đến Từ Ngàn Năm Trước",
    chapter: "Chapter 351",
    views: "562K",
  },
  {
    key: "2",
    rank: "02",
    img: "/assets/images.jpg",
    title: "Bách Luyện Thành Thần",
    chapter: "Chapter 1264",
    views: "41M",
  },
  {
    key: "3",
    rank: "03",
    img: "/assets/images.jpg",
    title: "Chàng Rể Mạnh Nhất Lịch Sử",
    chapter: "Chapter 269",
    views: "119K",
  },
  {
    key: "4",
    rank: "04",
    img: "/assets/images.jpg",
    title: "Ta Có 90 Tỷ Tiền Liếm Cầu!",
    chapter: "Chapter 495",
    views: "138K",
  },
  {
    key: "5",
    rank: "05",
    img: "/assets/images.jpg",
    title: "Đại Quân Gia Là Ma Hoàng",
    chapter: "Chapter 659",
    views: "469K",
  },
];

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    render: (rank: string, _record: Manga, index: number) => (
      <span
        className={`font-bold text-lg ${
          index < 3 ? "text-red-500" : "text-gray-500"
        }`}
      >
        {rank}
      </span>
    ),
  },
  {
    title: "Manga",
    dataIndex: "img",
    key: "img",
    render: (img: string, record: Manga) => (
      <div className="flex items-center space-x-2">
        <img
          src={img}
          alt={record.title}
          className="w-10 h-10 rounded object-cover"
        />
        <div>
          <p className="font-medium truncate w-40">{record.title}</p>
          <p className="text-sm text-gray-500">{record.chapter}</p>
        </div>
      </div>
    ),
  },
  {
    title: "Views",
    dataIndex: "views",
    key: "views",
    render: (views: string) => (
      <span className="flex items-center text-gray-500">
        {icons.eye} {views}
      </span>
    ),
  },
];
const items: TabsProps["items"] = [
  {
    key: "1",
    label: <span className="font-semibold text-base">Top Tháng</span>,
    children: (
      <Table<Manga>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        className="w-full border rounded-lg shadow-md"
      />
    ),
  },
  {
    key: "2",
    label: <span className="font-semibold text-base">Top Tuần</span>,
    children: (
      <Table<Manga>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        className="w-full border rounded-lg shadow-md"
      />
    ),
  },
  {
    key: "3",
    label: <span className="font-semibold text-base">Top Ngày</span>,
    children: (
      <Table<Manga>
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        showHeader={false}
        className="w-full border rounded-lg shadow-md"
      />
    ),
  },
];

export const TopManga = () => {
  return <Tabs centered items={items} />;
};
