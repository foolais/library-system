import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/Auth";
import BookPage from "../page/Book";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/auth", element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: "/book", element: <BookPage /> }],
  },
]);
