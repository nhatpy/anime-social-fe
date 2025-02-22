import { useState } from "react";
import { 
  Button, 
  message, 
  Pagination, 
  Table 
} from "antd";

import { icons } from "../../utils/icons";

const dataSource = [
  { key: "1", img: "/assets/images.jpg", title: "Bà Xã Nhà Tôi Đến Từ Ngàn Năm Trước", numberOfChapter: "Chapter 351", views: "562K", isVerified: true },
  { key: "2", img: "/assets/images.jpg", title: "Bách Luyện Thành Thần", numberOfChapter: "Chapter 1264", views: "41M", isVerified: true },
  { key: "3", img: "/assets/images.jpg", title: "Chàng Rể Mạnh Nhất Lịch Sử", numberOfChapter: "Chapter 269", views: "119K", isVerified: false },
  { key: "4", img: "/assets/images.jpg", title: "Ta Có 90 Tỷ Tiền Liếm Cầu!", numberOfChapter: "Chapter 495", views: "138K", isVerified: true },
  { key: "5", img: "/assets/images.jpg", title: "Đại Quân Gia Là Ma Hoàng", numberOfChapter: "Chapter 659", views: "469K", isVerified: false },
];

const columns = [
  {
    title: 'Hình nền',
    dataIndex: 'img',
    key: 'img',
    render: (img: string) => <img src={img} alt="" className="w-[70px] h-[70px] object-cover rounded-lg"/>
  },
  {
    title: 'Tên truyện',
    dataIndex: 'title',
    key: 'title',
    render: (title: string) => <p className="w-[200px] truncate">{title}</p>
  },
  {
    title: 'Lượt theo dõi',
    dataIndex: 'views',
    key: 'views',
    render: (views: string) => <p className="">{views}</p>
  },
  {
    title: 'Số chapter',
    dataIndex: 'numberOfChapter',
    key: 'numberOfChapter',
    render: (numberOfChapter: string) => <p className="">{numberOfChapter}</p>
  },
  {
    title: 'Xác nhận',
    dataIndex: 'isVerified',
    key: 'isVerified',
    render: (isVerified: boolean) => isVerified ? <p className="text-green-600">Đã xác nhận</p> : <p className="text-red-600">Chưa xác nhận</p>
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Button className="text-red-600" type="text">Xóa{icons.delete}</Button>
    )
  }
];

export const DashboardManageManga = () => {
  const handleConfirm = () => {
    message.success(`Xác nhận thành công ${selectedManga.length} truyện!`);
    setSelectedManga([]);
  };
  const [selectedManga, setSelectedManga] = useState<string[]>([]);

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedManga(selectedRowKeys as string[]);
      console.log(`selectedManga: ${selectedManga}`);
    },
    getCheckboxProps: (record: { isVerified: boolean }) => ({
      disabled: record.isVerified,
    }),
  };
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">
        Quản lý truyện
      </h2>
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-600 text-lg">
          Đã chọn: <b>{selectedManga.length}</b> truyện
        </span>
        <Button
          type="primary"
          className="bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow-md"
          disabled={selectedManga.length === 0}
          onClick={handleConfirm}
        >
          Xác nhận truyện
        </Button>
      </div>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-center w-full">
              <Table dataSource={dataSource} columns={columns} pagination={false} rowSelection={rowSelection}/>
            </div>
            <div className='flex justify-center items-center w-full'>
              <Pagination align="center" defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
