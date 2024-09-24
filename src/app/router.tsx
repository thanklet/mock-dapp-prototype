import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AdminRoot } from "./routes/admin/root";
import { AppRoot } from "./routes/app/root";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [
      {
        path: "users",
        lazy: async () => {
          const { UsersRoute } = await import("./routes/admin/users/users");
          return { Component: UsersRoute };
        },
      },
      {
        path: "users/:userId",
        lazy: async () => {
          const { UserRoute } = await import("./routes/admin/users/user");
          return { Component: UserRoute };
        },
      },
    ],
  },
  {
    path: "/app",
    element: <AppRoot />,
    children: [
      {
        path: ":userId/dashboard",
        lazy: async () => {
          const { DashboardRoute } = await import("./routes/app/dashboard");
          return { Component: DashboardRoute };
        },
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
