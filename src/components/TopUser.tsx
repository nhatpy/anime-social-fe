import { Table, Tabs, TabsProps } from "antd";
interface User {
  key: string;
  rank: string;
  avatar: string;
  name: string;
  amount: number;
}

const dataSource: User[] = [
  { key: "1", rank: "01", avatar: "/assets/images (1).jpg", name: "User 1", amount: 12 },
  { key: "2", rank: "02", avatar: "/assets/images (1).jpg", name: "User 2", amount: 23 },
  { key: "3", rank: "03", avatar: "/assets/images (1).jpg", name: "User 3", amount: 34 },
  { key: "4", rank: "04", avatar: "/assets/images (1).jpg", name: "User 4", amount: 54 },
  { key: "5", rank: "05", avatar: "/assets/images (1).jpg", name: "User 5", amount: 55 },
  { key: "6", rank: "06", avatar: "/assets/images (1).jpg", name: "User 6", amount: 66 },
  { key: "7", rank: "07", avatar: "/assets/images (1).jpg", name: "User 7", amount: 77 },
];

const columns = [
  {
    title: "Rank",
    dataIndex: "rank",
    key: "rank",
    render: (rank: string, _record: User, index: number) => (
      <span className={`font-bold text-lg ${index < 3 ? "text-red-500" : "text-gray-500"}`}>
        {rank}
      </span>
    ),
  },
  {
    title: "Manga",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar: string, record: User) => (
      <div className="flex items-center space-x-2">
        <img src={avatar} alt={record.name} className="w-10 h-10 rounded object-cover" />
        <div>
          <p className="font-medium truncate w-40">{record.name}</p>
          <p className="text-sm text-gray-500 border border-red-400 w-fit rounded-sm p-[1px]">{record.amount}</p>
        </div>
      </div>
    ),
  }
];

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Top Thành Viên',
    children: <Table<User>
      dataSource={dataSource}
      columns={columns}
      pagination={false}
      showHeader={false}
      className="w-full border rounded-lg shadow-md"
    />
  }
];

export const TopUser = () => {
  return (
    <Tabs 
      centered
      items={items} 
    />
  )
}
