import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Root from "./routes/Root";
import Dashboard from "./routes/Dashboard";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Receipt from "./routes/Receipt";
import Transactions from "./routes/Transactions";

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
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
