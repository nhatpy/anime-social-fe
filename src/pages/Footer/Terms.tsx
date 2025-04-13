import { Link } from "react-router-dom";

import { CustomBreadcrumb, TopManga } from "../../components";

export const Terms = () => {
  const items = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: "Chính sách bảo mật" },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-row bg-white p-5">
        <div className="flex flex-col w-full h-full pr-5">
          <div className="flex items-start justify-start w-full">
            <CustomBreadcrumb items={items} />
          </div>
          <div className="flex flex-col justify-center w-full gap-2 h-full mt-12">
            <h1 className="text-4xl font-bold text-blue-800">
              Chính sách bảo mật
            </h1>
            <p className="text-left">
              Chào bạn! Chúng tôi là Oneshot Manga - Website đọc truyện tranh từ
              nhiều thể loại trên nền tảng web.
            </p>
            <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
              Thông tin nào của bạn bị chúng tôi thu thập
            </h2>
            <ul className="text-left">
              <li>- Bình luận của bạn trên website</li>
              <li>- Thông tin liên hệ của bạn</li>
              <li>- Cookies</li>
            </ul>
            <h2 className="text-2xl font-semibold text-gray-800 text-left w-full">
              Chúng tôi cam kết
            </h2>
            <ul className="text-left">
              <li>
                - Không chia sẻ thông tin của bạn với bất kì bên thứ 3 nào khác
              </li>
              <li>
                - Dữ liệu của bạn như thông tin các bình luận trên website, sẽ
                được tồn tại vô thời hạn, tuy nhiên bạn có thể quyết định nó có
                thể xóa hay không, kể cả admin cũng vậy
              </li>
              <li>
                - Nếu bạn có nhu cầu không muốn chúng tôi lưu giữ bất kì thông
                tin nào của bạn, hãy{" "}
                <Link to="/contact" className="text-blue-400">
                  liên hệ
                </Link>{" "}
                chúng tôi để yêu cầu điều đó
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[40%] gap-2 mt-12">
          <TopManga />
        </div>
      </div>
    </div>
  );
};
