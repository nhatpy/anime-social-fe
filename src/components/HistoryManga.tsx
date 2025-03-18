import { Link } from "react-router-dom";
import { 
  Card, 
  List 
} from "antd"

import { icons } from "../utils/icons";
interface LastReadManga {
  key: string;
  rank: string;
  img: string;
  title: string;
  chapter: string;
  views: string;
}

const dataSource: LastReadManga[] = [
  { key: "1", rank: "01", img: "/assets/images.jpg", title: "Bà Xã Nhà Tôi Đến Từ Ngàn Năm Trước", chapter: "Chapter 351", views: "562K" },
  { key: "2", rank: "02", img: "/assets/images.jpg", title: "Bách Luyện Thành Thần", chapter: "Chapter 1264", views: "41M" },
  { key: "3", rank: "03", img: "/assets/images.jpg", title: "Chàng Rể Mạnh Nhất Lịch Sử", chapter: "Chapter 269", views: "119K" },
  { key: "4", rank: "04", img: "/assets/images.jpg", title: "Ta Có 90 Tỷ Tiền Liếm Cầu!", chapter: "Chapter 495", views: "138K" },
  { key: "5", rank: "05", img: "/assets/images.jpg", title: "Đại Quân Gia Là Ma Hoàng", chapter: "Chapter 659", views: "469K" }
];

export const HistoryManga = () => {

  return (
    <Card 
      title="Truyện Vừa Đọc" 
      extra={<Link to={"/history"} className="text-sm italic text-gray-500">Xem tất cả</Link>} 
      style={{ width: "100%" }}
      styles={{ body: { padding: "16px" } }}
    >
      <List
        dataSource={dataSource}
        renderItem={(item, index) => (
          <List.Item className="flex items-center border-b gap-2 w-full">
            <span className={`font-bold text-lg ${index < 3 ? "text-red-500" : "text-gray-500"}`}>
              {item.rank}
            </span>
            <div className="flex items-center space-x-2 flex-1">
              <img src={item.img} alt={item.title} className="w-10 h-10 rounded object-cover" />
              <div className="w-full">
                <p className="font-medium truncate w-40">{item.title}</p>
                <p className="text-sm text-gray-500">{item.chapter}</p>
              </div>
            </div>
            <span className="flex items-center text-gray-500">{icons.eye} {item.views}</span>
          </List.Item>
        )}
      />
    </Card>
  )
}
