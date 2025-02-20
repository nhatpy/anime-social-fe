import { Button, Pagination, Popover, Table } from "antd";
import { icons } from "../../utils/icons";

const dataSource = [
  { key: "1", img: "/assets/images.jpg", fullName: "User 1", gem: "351", isWarning: true },
  { key: "2", img: "/assets/images.jpg", fullName: "User 1", gem: "1264", isWarning: false },
  { key: "3", img: "/assets/images.jpg", fullName: "User 1", gem: "269", isWarning: true },
  { key: "4", img: "/assets/images.jpg", fullName: "User 1", gem: "495", isWarning: true },
  { key: "5", img: "/assets/images.jpg", fullName: "User 1", gem: "659", isWarning: false },
];
const content = (
  <div className="flex flex-row gap-2">
    <Button className="text-amber-400" type="text">Cảnh cáo{icons.iconwithI}</Button>
    <Button className="text-red-600" type="text">Xóa{icons.delete}</Button>
  </div>
)
const columns = [
  {
    title: 'Ảnh đại diện',
    dataIndex: 'img',
    key: 'img',
    render: (img: string) => <img src={img} alt
    ="" className="w-[70px] h-[70px] object-cover rounded-lg"/>
  },
  {
    title: 'Tên người dùng',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (fullName: string) => <p className="w-[100px] truncate">{fullName}</p>
  },
  {
    title: 'Linh thạch',
    dataIndex: 'gem',
    key: 'gem',
    render: (gem: string) => <p className="flex justify-center items-center text-pink-600">{gem}{icons.diamond}</p>
  },
  {
    title: 'Đã bị cảnh cáo',
    dataIndex: 'isWarning',
    key: 'isWarning',
    render: (isWarning: boolean) => <p className={`flex justify-center items-center ${isWarning ? "text-amber-500" : "text-green-600"}`}>{isWarning ? "Có" : "Không"}</p>
  },
  {
    title: "Hành động",
    key: "action",
    render: () => (
      <Popover content={content} trigger="hover">
        <Button type="primary">Hành động</Button>
      </Popover>
    )
  }
];

export const DashboardManageUser = () => {
  return (
    <div className="flex flex-col gap-4 w-full h-full">
      <h2 className="text-3xl font-bold text-blue-800">
        Quản lý người dùng
      </h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4 mt-5 text-base text-[18px]">
            <div className="flex flex-row gap-5 items-center justify-center w-full">
              <Table dataSource={dataSource} columns={columns} pagination={false}/>
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
