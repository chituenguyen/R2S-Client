import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  allowedRoles: string[];
  userRoles: string[]; // Thay đổi thành mảng roles
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, userRoles }) => {
  const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));

  if (!hasRequiredRole) {
    return <Navigate to="/" replace />; // Chuyển hướng đến trang đăng nhập nếu không có quyền
  }
  const hideLayout = location.pathname.startsWith('/admin') && new URLSearchParams(location.search).get('layout') === 'false';
  return <Outlet context={{ hideLayout }}  />; // Render các route con nếu có quyền
};

export default ProtectedRoute;