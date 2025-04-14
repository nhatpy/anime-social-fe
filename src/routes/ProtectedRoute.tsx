import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../utils/stores";
import { Button, Result } from "antd";
import { ReactNode } from "react";

type ProtectedRouteProps = {
  role: string;
  children: ReactNode;
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  role,
  children,
}) => {
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();
  const handleBackToHome = () => {
    navigate("/");
  };

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser.role[0] !== role) {
    return (
      <Result
        status="403"
        title="403"
        subTitle="Bạn không có quyền truy cập trang này"
        extra={<Button onClick={handleBackToHome}>Quay lại trang chủ</Button>}
      />
    );
  }

  return <>{children}</>;
};
