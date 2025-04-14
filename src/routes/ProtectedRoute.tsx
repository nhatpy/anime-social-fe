import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../utils/stores";
import { message, Result } from "antd";

type ProtectedRouteProps = {
  role: string;
  children: React.ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
}) => {
  const { currentUser } = useAuthStore();
  const hasShownMessage = useRef(false);

  if (!currentUser) {
    if (!hasShownMessage.current) {
      message.error("Bạn cần đăng nhập để truy cập trang này.");
      hasShownMessage.current = true;
    }
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role[0] !== role) {
    if (!hasShownMessage.current) {
      message.error("Bạn không có quyền truy cập trang này.");
      hasShownMessage.current = true;
    }
    return (
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này"
      />
    );
  }

  return <>{children}</>;
};
