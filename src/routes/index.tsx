import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/Auth";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
