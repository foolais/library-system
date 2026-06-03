import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/Auth";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";
import BooksPage from "../page/Books";
import LoansPage from "../page/Loans";
import FinesPage from "../page/Fines";

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [{ path: "/auth", element: <AuthPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/books", element: <BooksPage /> },
      { path: "/loans", element: <LoansPage /> },
      { path: "/fines", element: <FinesPage /> },
    ],
  },
]);
