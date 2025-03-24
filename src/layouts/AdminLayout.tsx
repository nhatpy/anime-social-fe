import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Layout, Menu } from "antd";
import { icons } from "../utils/icons";

const { Sider, Content, Footer } = Layout;

const menuItems = [
  {
    key: "dashboard",
    label: <Link to="/admin">Thống kê</Link>,
    icon: icons.chart,
  },
  {
    key: "users",
    label: <Link to="/admin/manage-user">Quản lý người dùng</Link>,
    icon: icons.user,
  },
  {
    key: "categories",
    label: <Link to="/admin/manage-category">Quản lý thể loại</Link>,
    icon: icons.category,
  },
  {
    key: "stories",
    label: <Link to="/admin/manage-manga">Quản lý truyện</Link>,
    icon: icons.book,
  },
  {
    key: "logout",
    label: <Link to="/">Đăng xuất</Link>,
    icon: icons.logout,
  },
];

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
        <div className={`h-20 ${collapsed ? "hidden" : "mb-10"}`}>
          <img src="/assets/logo.png" alt="logo" className="" />
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          items={menuItems}
          className="text-base"
        />
      </Sider>
      <Layout>
        <Content className="p-4 m-4">
          <Outlet />
        </Content>
        <Footer className="text-center p-4">
          © 2025 Admin Dashboard. All Rights Reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};
