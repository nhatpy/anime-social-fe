import { Button, Pagination, Popover, Table } from "antd";
import { icons } from "../../utils/icons";

const dataSource = [
  {
    key: "1",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "351",
    isWarning: true,
  },
  {
    key: "2",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "1264",
    isWarning: false,
  },
  {
    key: "3",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "269",
    isWarning: true,
  },
  {
    key: "4",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "495",
    isWarning: true,
  },
  {
    key: "5",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "659",
    isWarning: false,
  },
  {
    key: "6",
    img: "/assets/images.jpg",
    fullName: "User 1",
    gem: "659",
    isWarning: false,
  },
];

const content = (
  <div className="flex flex-row gap-2">
    <Button className="text-amber-500 hover:text-amber-600" type="text">
      Cảnh cáo {icons.iconwithI}
    </Button>
    <Button className="text-red-600 hover:text-red-700" type="text">
      Xóa {icons.delete}
    </Button>
  </div>
);

const columns = [
  {
    title: <span className="font-semibold">Ảnh đại diện</span>,
    dataIndex: "img",
    key: "img",
    width: "15%",
    align: "center" as const,
    render: (img: string) => (
      <div className="flex items-center justify-center">
        <img
          src={img}
          alt="Avatar"
          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
        />
      </div>
    ),
  },
  {
    title: <span className="font-semibold">Tên người dùng</span>,
    dataIndex: "fullName",
    key: "fullName",
    width: "25%",
    align: "center" as const,
    render: (fullName: string) => (
      <p className="truncate font-medium text-gray-800">{fullName}</p>
    ),
  },
  {
    title: <span className="font-semibold">Linh thạch</span>,
    dataIndex: "gem",
    key: "gem",
    width: "20%",
    align: "center" as const,
    render: (gem: string) => (
      <p className="text-pink-600 font-medium flex items-center justify-center gap-1">
        {gem}
        {icons.diamond}
      </p>
    ),
  },
  {
    title: <span className="font-semibold">Đã bị cảnh cáo</span>,
    dataIndex: "isWarning",
    key: "isWarning",
    width: "20%",
    align: "center" as const,
    render: (isWarning: boolean) => (
      <span
        className={`font-medium ${
          isWarning ? "text-amber-500" : "text-green-600"
        }`}
      >
        {isWarning ? "Có" : "Không"}
      </span>
    ),
  },
  {
    title: <span className="font-semibold">Hành động</span>,
    key: "action",
    width: "20%",
    align: "center" as const,
    render: () => (
      <Popover
        content={content}
        trigger="click"
        placement="bottom"
        overlayClassName="popover-no-padding"
      >
        <Button type="primary" className="bg-blue-600 hover:bg-blue-700">
          Hành động
        </Button>
      </Popover>
    ),
  },
];

export const DashboardManageUser = () => {
  return (
    <div className="flex flex-col gap-6 w-full h-full">
      <h2 className="text-2xl md:text-3xl font-bold text-blue-800 mb-2">
        Quản lý truyện
      </h2>
      <div className="bg-white p-6 pb-3 rounded-lg shadow-sm border border-gray-100">
        <Table
          className="w-full"
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          bordered
          scroll={{ x: "100%" }}
        />

        <div className="flex justify-center mt-6">
          <Pagination
            defaultCurrent={1}
            pageSize={5}
            total={20}
            showSizeChanger={false}
            className="ant-pagination-item-active:border-blue-600 ant-pagination-item-active:bg-blue-600"
          />
        </div>
      </div>
    </div>
  );
};
