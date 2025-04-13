import { Link } from "react-router-dom";

import { icons } from "../icons";
import { LogoutFunction } from "../helpers";

export const ItemsLogin = () => {
  const { handleLogout } = LogoutFunction();
  const itemsLogin = [
    {
      key: "dashboard",
      label: (
        <Link to="/dashboard" className="flex flex-row items-center gap-2">
          <span>{icons.user}</span> Trang cá nhân
        </Link>
      ),
    },
    {
      key: "history",
      label: (
        <Link to="/history" className="flex flex-row items-center gap-2">
          <span>{icons.book}</span> Truyện đang đọc
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <p className="flex flex-row items-center gap-2">
          <button
            className="flex flex-row items-center gap-2"
            onClick={() =>
              handleLogout(localStorage.getItem("access_token") || "")
            }
          >
            <span>{icons.logout}</span> Đăng xuất
          </button>
        </p>
      ),
    },
  ];
  return itemsLogin;
};
