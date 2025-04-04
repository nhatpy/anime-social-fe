import { useState } from "react";
import { Layout, Input, Badge, Dropdown, Menu } from "antd";

import { icons } from "../../utils/icons";
import { items, ItemsLogin, menuItemNavbar } from "../../utils/constants";
import { useAuthStore } from "../../utils/stores";

const { Header: AntdHeader } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 80,
  width: "100%",
  paddingInline: 40,
  lineHeight: "40",
  backgroundImage: "url(/assets/partial_background.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const Header = () => {
  const [notification] = useState(9);
  const { isLogin } = useAuthStore();
  const itemsLogin = ItemsLogin();

  return (
    <>
      <AntdHeader style={headerStyle}>
        <div className="flex flex-row items-center justify-evenly w-[60%] mx-auto">
          <img src="/assets/logo.png" alt="logo" className="w-[20%] h-[80px]" />
          <Input
            placeholder="Tìm truyện"
            prefix={icons.search}
            className="w-[25%] rounded-none ml-5"
          />
          <Badge count={notification} overflowCount={9}>
            <div className="text-white text-xl">{icons.notification}</div>
          </Badge>
          <div className="flex flex-row items-center gap-2">
            <div className="text-xl">{icons.user}</div>
            <Dropdown
              menu={{ items: isLogin ? itemsLogin : items }}
              placement="bottom"
            >
              <div className="flex flex-row text-sm cursor-pointer gap-2 justify-center items-center">
                <span>Tài khoản</span> <span>{icons.down}</span>
              </div>
            </Dropdown>
          </div>
        </div>
      </AntdHeader>
      <div className="sticky top-0 left-0 z-50">
        <div className="flex justify-center items-center w-full text-base bg-white">
          <Menu
            mode="horizontal"
            items={menuItemNavbar}
            className="menu-centered"
          />
        </div>
      </div>
    </>
  );
};
