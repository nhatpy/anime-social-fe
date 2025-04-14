import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../utils/stores";

type PublicOrUserRouteProps = {
  children: ReactNode;
};

export const ExceptAdminRoute: React.FC<PublicOrUserRouteProps> = ({
  children,
}) => {
  const { currentUser } = useAuthStore();

  if (currentUser && currentUser.role[0] === "ADMIN") {
    return <Navigate to="/admin" replace />;
  }

  return <>{children}</>;
};
