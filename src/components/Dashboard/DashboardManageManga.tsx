import { useState } from "react";
import { Button, message, Pagination, Table } from "antd";
import { icons } from "../../utils/icons";

const dataSource = [
  {
    key: "1",
    img: "/assets/images.jpg",
    title: "Bà Xã Nhà Tôi Đến Từ Ngàn Năm Trước",
    numberOfChapter: "Chapter 351",
    views: "562K",
    isVerified: true,
  },
  {
    key: "2",
    img: "/assets/images.jpg",
    title: "Bách Luyện Thành Thần",
    numberOfChapter: "Chapter 1264",
    views: "41M",
    isVerified: true,
  },
  {
    key: "3",
    img: "/assets/images.jpg",
    title: "Chàng Rể Mạnh Nhất Lịch Sử",
    numberOfChapter: "Chapter 269",
    views: "119K",
    isVerified: false,
  },
  {
    key: "4",
    img: "/assets/images.jpg",
    title: "Ta Có 90 Tỷ Tiền Liếm Cầu!",
    numberOfChapter: "Chapter 495",
    views: "138K",
    isVerified: true,
  },
  {
    key: "5",
    img: "/assets/images.jpg",
    title:
      "Đại Quân Gia Là Ma HoàngĐại Quân Gia Là Ma HoàngĐại Quân Gia Là Ma Hoàng",
    numberOfChapter: "Chapter 659",
    views: "469K",
    isVerified: false,
  },
];

const columns = [
  {
    title: <span className="font-semibold">Hình nền</span>,
    dataIndex: "img",
    key: "img",
    width: "12%",
    align: "center" as const,
    render: (img: string) => (
      <div className="flex justify-center items-center">
        <img
          src={img}
          alt="Cover"
          className="w-16 h-20 object-cover rounded-lg border border-gray-200"
        />
      </div>
    ),
  },
  {
    title: <span className="font-semibold">Tên truyện</span>,
    dataIndex: "title",
    key: "title",
    width: "30%",
    render: (title: string) => (
      <p className="truncate font-medium text-gray-800 hover:text-blue-600 cursor-pointer max-w-[320px]">
        {title}
      </p>
    ),
  },
  {
    title: <span className="font-semibold">Lượt theo dõi</span>,
    dataIndex: "views",
    key: "views",
    width: "15%",
    align: "center" as const,
    render: (views: string) => (
      <p className="font-medium text-gray-700">{views}</p>
    ),
  },
  {
    title: <span className="font-semibold">Số chapter</span>,
    dataIndex: "numberOfChapter",
    key: "numberOfChapter",
    width: "15%",
    align: "center" as const,
    render: (numberOfChapter: string) => (
      <p className="font-medium text-gray-700">{numberOfChapter}</p>
    ),
  },
  {
    title: <span className="font-semibold">Xác nhận</span>,
    dataIndex: "isVerified",
    key: "isVerified",
    width: "15%",
    align: "center" as const,
    render: (isVerified: boolean) => (
      <span
        className={`font-medium ${
          isVerified ? "text-green-600" : "text-red-600"
        }`}
      >
        {isVerified ? "Đã xác nhận" : "Chưa xác nhận"}
      </span>
    ),
  },
  {
    title: <span className="font-semibold">Hành động</span>,
    key: "action",
    width: "13%",
    align: "center" as const,
    render: () => (
      <Button
        className="text-red-600 hover:text-red-700 font-medium"
        type="text"
        icon={icons.delete}
      >
        Xóa
      </Button>
    ),
  },
];

export const DashboardManageManga = () => {
  const [selectedManga, setSelectedManga] = useState<string[]>([]);

  const handleConfirm = () => {
    message.success(`Xác nhận thành công ${selectedManga.length} truyện!`);
    setSelectedManga([]);
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedManga(selectedRowKeys as string[]);
    },
    getCheckboxProps: (record: { isVerified: boolean }) => ({
      disabled: record.isVerified,
    }),
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full p-4">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
        Quản lý truyện
      </h2>

      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
        <span className="text-gray-700 text-lg font-medium">
          Đã chọn: <span className="text-blue-600">{selectedManga.length}</span>{" "}
          truyện
        </span>
        <Button
          type="primary"
          className="bg-blue-600 hover:bg-blue-700 h-10 px-6 font-medium"
          disabled={selectedManga.length === 0}
          onClick={handleConfirm}
        >
          Xác nhận truyện
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          rowSelection={rowSelection}
          bordered
          scroll={{ x: "100%" }}
          className="w-full"
        />

        <div className="flex justify-center mt-6">
          <Pagination
            defaultCurrent={1}
            total={50}
            showSizeChanger={false}
            className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
