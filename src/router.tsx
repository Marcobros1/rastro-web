import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { NotFoundPage } from "./components/ui/NotFoundPage";
import { ListingsPage } from "./features/listings/ListingsPage";
import { ListingDetailPage } from "./features/listings/ListingDetailPage";
import { NewListingPage } from "./features/listings/NewListingPage";
import { StatsPage } from "./features/stats/StatsPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <ListingsPage /> },
      { path: "/listings/new", element: <NewListingPage /> },
      { path: "/stats", element: <StatsPage /> },
      { path: "/listings/:id", element: <ListingDetailPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
