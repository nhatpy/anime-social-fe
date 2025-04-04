import { Link, Outlet } from "react-router-dom";
import { Tabs, TabsProps } from "antd";

import { CustomBreadcrumb } from "../components";
import { icons } from "../utils/icons";
import { LogoutFunction } from "../utils/helpers";

export const DashboardLayout = () => {
  const { handleLogout } = LogoutFunction();

  const breadcrumItems = [
    { title: <Link to="/">Trang chủ</Link> },
    { title: "Thông tin chung" },
  ];

  const userItems: TabsProps["items"] = [
    {
      key: "user-info",
      label: (
        <Link
          to="/dashboard"
          className="font-medium text-base flex items-center gap-2"
        >
          {icons.iconwithI}Thông tin tài khoản
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: "user-gem",
      label: (
        <Link
          to="/dashboard/gem"
          className="font-medium text-base flex items-center gap-2"
        >
          {icons.diamond}Linh thạch
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: "user-manga",
      label: (
        <Link
          to="/dashboard/manga"
          className="font-medium text-base flex items-center gap-2"
        >
          {icons.book}Truyện của bạn
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: "user-change-password",
      label: (
        <Link
          to="/dashboard/change-password"
          className="font-medium text-base flex items-center gap-2"
        >
          {icons.password}Đổi mật khẩu
        </Link>
      ),
      children: <Outlet />,
    },
    {
      key: "user-logout",
      label: (
        <p className="font-medium text-base flex items-center gap-2">
          <button
            className="flex items-center gap-2"
            onClick={() =>
              handleLogout(localStorage.getItem("access_token") || "")
            }
          >
            {icons.logout}Đăng xuất
          </button>
        </p>
      ),
      children: <Outlet />,
    },
  ];

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-[60%] h-full flex flex-col bg-white p-5 gap-5">
        <div className="flex flex-col justify-center w-full">
          <CustomBreadcrumb items={breadcrumItems} />
        </div>
        <Tabs tabPosition={"left"} items={userItems} />
      </div>
    </div>
  );
};
