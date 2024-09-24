import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminRoot } from "./routes/admin/root";
const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "users",
        lazy: async () => {
          const { Users } = await import("./routes/admin/users");
          return { Component: Users };
        },
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
