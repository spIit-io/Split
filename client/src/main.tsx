import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./routes/Root";
import Dashboard from "./routes/Dashboard";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Receipt from "./routes/Receipt";
import Transactions from "./routes/Transactions";
import NewPayment from "./routes/NewPayment";
import Contacts from "./routes/Contacts";
import Categories from "./routes/Categories"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "new",
        element: <NewPayment />,
      },
      {
        path: "contacts",
        element: <Contacts />,
      },
      {
        path: "categories",
        element: <Categories />
      }
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
