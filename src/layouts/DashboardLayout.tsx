import { 
    Link, 
    Outlet 
} from "react-router-dom";
import { useState } from "react";
import { 
    Tabs, 
    TabsProps 
} from "antd";

import { Roles } from "../utils/common";
import { CustomBreadcrumb } from "../components";
import { icons } from "../utils/icons";

export const DashboardLayout = () => {
    const breadcrumItems = [{title: <Link to="/">Trang chủ</Link>}, {title: "Thông tin chung"}]

    const userItems: TabsProps["items"] = [
        {
            key: "user-info",
            label: <Link to="/dashboard" className="font-medium text-base flex items-center gap-2">{icons.iconwithI}Thông tin tài khoản</Link>,
            children: <Outlet />,
        },
        {
            key: "user-gem",
            label: <Link to="/dashboard/gem" className="font-medium text-base flex items-center gap-2">{icons.diamond}Linh thạch</Link>,
            children: <Outlet />,
        },
        {
            key: "user-manga",
            label: <Link to="/dashboard/manga" className="font-medium text-base flex items-center gap-2">{icons.book}Truyện của bạn</Link>,
            children: <Outlet />,
        },
        {
            key: "user-change-password",
            label: <Link to="/dashboard/change-password" className="font-medium text-base flex items-center gap-2">{icons.password}Đổi mật khẩu</Link>,
            children: <Outlet />,
        },
        {
            key: "user-logout",
            label: <Link to="/#" className="font-medium text-base flex items-center gap-2">{icons.logout}Thoát</Link>,
            children: <Outlet />,
        },
    ];

    const adminItems: TabsProps["items"] = [
        {
            key: "admin-info",
            label: <Link to="/dashboard" className="font-medium text-base flex items-center gap-2">{icons.iconwithI}Thông tin tài khoản</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-chart",
            label: <Link to="/dashboard/chart" className="font-medium text-base flex items-center gap-2">{icons.chart}Thống kê</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-manage-user",
            label: <Link to="/dashboard/manage-user" className="font-medium text-base flex items-center gap-2">{icons.user}Quản lý người dùng</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-manage-category",
            label: <Link to="/dashboard/category" className="font-medium text-base flex items-center gap-2">{icons.category}Quản lý thể loại</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-manage-manga",
            label: <Link to="/dashboard/manage-manga" className="font-medium text-base flex items-center gap-2">{icons.book}Quản lý truyện</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-change-password",
            label: <Link to="/dashboard/change-password" className="font-medium text-base flex items-center gap-2">{icons.password}Đổi mật khẩu</Link>,
            children: <Outlet />,
        },
        {
            key: "admin-logout",
            label: <Link to="/#" className="font-medium text-base flex items-center gap-2">{icons.logout}Thoát</Link>,
            children: <Outlet />,
        },
    ];

    //ADMIN
    //USER
    const [isAdmin] = useState("USER");
  return (
    <div className="w-full h-full flex justify-center items-center">
        <div className="w-[60%] h-full flex flex-col bg-white p-5 gap-5">
            <div className="flex flex-col justify-center w-full">
                <CustomBreadcrumb items={breadcrumItems}/>
            </div>
            <Tabs
                tabPosition={"left"}
                items={isAdmin === Roles.ADMIN ? adminItems : userItems}
            />
        </div>
    </div>
  )
}
