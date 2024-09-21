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
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
