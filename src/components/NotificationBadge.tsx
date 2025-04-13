import React, { useState } from "react";
import { icons } from "../utils/icons";
import { Badge, Dropdown, Empty, Spin } from "antd";
import { INotification } from "../interfaces";

type NotificationBadgeProps = {
  notifications: INotification[];
  total: number;
  loading: boolean;
  handleDeleteNotification: (notificationId: string) => Promise<void>;
};

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  notifications,
  total,
  loading,
  handleDeleteNotification,
}) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const notificationDropdownContent = (notifications: INotification[]) => (
    <div className="w-fit bg-white rounded-md shadow-lg p-2 gap-4">
      {notifications.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_DEFAULT}
          description={
            <div>
              <p className="text-sm text-blue-600 font-semibold">
                Chưa có thông báo
              </p>
            </div>
          }
        />
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Spin />
            </div>
          ) : (
            notifications.map((noti) => (
              <button
                key={noti.id}
                onClick={() => handleDeleteNotification(noti.id)}
                className="flex flex-row items-center justify-between w-full hover:bg-red-200 rounded-md p-2 transition-all duration-200"
              >
                <div className="flex flex-col gap-1 p-2">
                  <p className="text-xs text-gray-500 italic text-left">{`#${noti.id}`}</p>
                  <p className="text-base font-medium text-gray-800 truncate max-w-sm">
                    {noti.content}
                  </p>
                </div>
              </button>
            ))
          )}
        </>
      )}
    </div>
  );
  return (
    <Dropdown
      open={openDropdown}
      onOpenChange={setOpenDropdown}
      dropdownRender={() => notificationDropdownContent(notifications)}
      placement="bottom"
    >
      <Badge
        count={total}
        overflowCount={9}
        offset={[0, 0]}
        className="cursor-pointer"
      >
        <div className="rounded-full shadow flex items-center justify-center hover:bg-blue-500 transition-all duration-200">
          <span className="text-white text-2xl">{icons.notification}</span>
        </div>
      </Badge>
    </Dropdown>
  );
};
