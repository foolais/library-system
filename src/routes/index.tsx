import { createBrowserRouter } from "react-router-dom";
import AuthPage from "../page/Auth";
import BookPage from "../page/Book";

export const router = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthPage />,
  },
  {
    path: "/book",
    element: <BookPage />,
  },
]);
