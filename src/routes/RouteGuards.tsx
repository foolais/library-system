import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/auth.store";

const isAuthenticated = () => {
  const token = useAuthStore.getState().token;
  return !!token;
};

export const ProtectedRoute = () => {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/auth" />;
};

export const PublicRoute = () => {
  return !isAuthenticated() ? <Outlet /> : <Navigate to="/books" />;
};
