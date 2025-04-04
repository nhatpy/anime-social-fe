import { Link } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";

import { icons } from "../../utils/icons";
import {
  CustomBreadcrumb,
  HistoryManga,
  TopManga,
  TopUser,
} from "../../components";
import { useAuthStore } from "../../utils/stores";

const chaptersData = Array.from({ length: 100 }, (_, i) => ({
  id: 100 - i,
  title: `Chapter ${100 - i}`,
  timeAgo: `${Math.floor((100 - i) / 5)} ngày trước`,
  isLocked: [99, 20, 1].includes(100 - i),
}));

export const MangaDetail = () => {
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: <Link to="/search">Thể loại</Link> },
    { title: <p>Chuyển sinh thành liễu đột biến</p> },
  ];
  const { isLogin } = useAuthStore();
  const [isFollow] = useState(true);

  const [visibleChapters, setVisibleChapters] = useState(15);

  const handleLoadMore = () => {
    setVisibleChapters((prev) => prev + 10);
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col justify-center items-center bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full gap-5">
          <CustomBreadcrumb items={items} />
        </div>
        <div className="flex flex-row w-full gap-4">
          <div className="flex flex-col w-full gap-2">
            <div className="flex flex-col w-full h-fit-content justify-center items-center">
              <h3 className="text-2xl text-[22px] uppercase">
                chuyển sinh thành liễu đột biến
              </h3>
              <p className="text-sm italic text-gray-500">
                [Cập nhật lúc: 20/02/2025 22:31:06]
              </p>
            </div>
            <div className="flex flex-row w-full justify-between">
              <div className="flex flex-col w-[29%] gap-2">
                <img
                  src="/assets/images.jpg"
                  alt=""
                  className="w-[250px] h-[300px]"
                />
              </div>
              <div className="flex flex-col w-[69%] gap-2 text-gray-500 text-lg">
                <div className="flex flex-row gap-2 w-full">
                  <p className="flex w-[30%] items-center h-fit gap-1">
                    {icons.user}Tác giả
                  </p>
                  <p className="w-[70%] float">Long Nhật</p>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <p className="flex w-[30%] items-center h-fit gap-1">
                    {icons.status}Tình trạng
                  </p>
                  <p className="w-[70%] float">Đang tiến hành</p>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <p className="flex w-[30%] items-center h-fit gap-1">
                    {icons.tag}Thể loại
                  </p>
                  <p className="w-[70%] float">
                    {[
                      "Action",
                      "Adventure",
                      "Comedy",
                      "Fantasy",
                      "Shounen",
                    ].map((item, index, array) => (
                      <span key={index} className="text-blue-500">
                        {item}
                        {index < array.length - 1 && " - "}
                      </span>
                    ))}
                  </p>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <p className="flex w-[30%] items-center h-fit gap-1">
                    {icons.eye}Lượt xem
                  </p>
                  <p className="w-[70%] float">100K</p>
                </div>
                <div className="flex flex-row gap-2 w-full">
                  <p className="flex w-[30%] items-center h-fit gap-1">
                    {icons.description}Mô tả
                  </p>
                  <p className="w-[70%] float">
                    Ngu Tử Du bị chết sặc rồi chuyển sinh thành một cây liễu đột
                    biến và bắt đầu cuộc phiêu lưu của mình.
                  </p>
                </div>
                <div className="flex flex-row w-full gap-5">
                  <Button
                    className={`flex items-center gap-2 p-4 text-base rounded-md text-white hover:!bg-white transition-all duration-300 ${
                      isFollow ? "bg-red-500" : "bg-blue-500"
                    }`}
                  >
                    {icons.heart}
                    {isFollow ? "Hủy theo dõi" : "Theo dõi"}
                  </Button>
                  <p>
                    <span className="font-bold">190.403</span> người đang theo
                    dõi
                  </p>
                </div>
                <div className="flex flex-row w-full gap-2">
                  <Button className="w-fit p-4 text-white bg-amber-500">
                    Đọc từ đầu
                  </Button>
                  <Button className="w-fit p-4 text-white bg-amber-500">
                    Đọc mới nhất
                  </Button>
                </div>
              </div>
            </div>
            <div className="border rounded-lg p-4 bg-white w-full mx-auto">
              <div className="flex items-center border-b pb-2 mb-2">
                <span className="font-semibold flex items-center gap-2">
                  {icons.book} Danh sách chương
                </span>
              </div>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-left">
                    <th className="p-2">Số chương</th>
                    <th className="p-2">Cập nhật</th>
                  </tr>
                </thead>
                <tbody>
                  {chaptersData.slice(0, visibleChapters).map((chapter) => (
                    <tr key={chapter.id} className="border-b text-sm">
                      <td
                        className={`p-2 ${
                          chapter.isLocked && "text-gray-400 italic"
                        }`}
                      >
                        <Link
                          to={
                            "/manga/chuyen-sinh-thanh-lieu-dot-bien/chapter-12"
                          }
                        >
                          {chapter.title}
                        </Link>
                      </td>
                      <td className="p-2 text-gray-500 italic">
                        {chapter.timeAgo}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {visibleChapters < chaptersData.length && (
                <div className="flex justify-center mt-4">
                  <Button
                    type="link"
                    onClick={handleLoadMore}
                    icon={<span className="text-blue-500">{icons.more}</span>}
                  >
                    Xem thêm
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col w-[30%] gap-5">
            {isLogin && (
              <>
                <HistoryManga />
              </>
            )}
            <TopManga />
            <TopUser />
          </div>
        </div>
      </div>
    </div>
  );
};
