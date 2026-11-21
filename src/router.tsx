import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { NotFoundPage } from "./components/ui/NotFoundPage";
import { ListingsPage } from "./features/listings/ListingsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ListingsPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
