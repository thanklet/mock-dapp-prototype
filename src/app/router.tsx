import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import { RedirectProvider } from "./providers/redirect-provider";
import { AdminRoot } from "./routes/admin/root";
import { AppRoot } from "./routes/app/root";
import { AuthRoot } from "./routes/auth/root";
import { ProfileRoot } from "./routes/profile/root";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RedirectProvider>
        <Outlet />
      </RedirectProvider>
    ),
    children: [
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
            path: "dashboard",
            lazy: async () => {
              const { DashboardRoute } = await import("./routes/app/dashboard");
              return { Component: DashboardRoute };
            },
          },
          {
            path: "thanks/location",
            lazy: async () => {
              const { LocationRoute } = await import(
                "./routes/app/thanks/location"
              );
              return { Component: LocationRoute };
            },
          },
          {
            path: "thanks/send/:receiveUserId",
            lazy: async () => {
              const { SendRoute } = await import("./routes/app/thanks/send");
              return { Component: SendRoute };
            },
          },
          {
            path: "wallet",
            children: [
              {
                path: "transfer",
                lazy: async () => {
                  const { TransferRoute } = await import(
                    "./routes/app/wallet/transfer"
                  );
                  return { Component: TransferRoute };
                },
              },
              {
                path: "staking",
                lazy: async () => {
                  const { StakingRoute } = await import(
                    "./routes/app/wallet/staking"
                  );
                  return { Component: StakingRoute };
                },
              },
              {
                path: "buy",
                lazy: async () => {
                  const { BuyRoute } = await import("./routes/app/wallet/buy");
                  return { Component: BuyRoute };
                },
              },
            ],
          },
        ],
      },
      {
        path: "/profile",
        element: <ProfileRoot />,
        children: [
          {
            path: "",
            lazy: async () => {
              const { ProfileRoute } = await import("./routes/profile/profile");
              return { Component: ProfileRoute };
            },
          },
          {
            path: "edit",
            lazy: async () => {
              const { EditRoute } = await import("./routes/profile/edit");
              return { Component: EditRoute };
            },
          },
          {
            path: "qr",
            lazy: async () => {
              const { QrRoute } = await import("./routes/profile/qr");
              return { Component: QrRoute };
            },
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthRoot />,
        children: [
          {
            path: "login",
            lazy: async () => {
              const { LoginRoute } = await import("./routes/auth/login/login");
              return { Component: LoginRoute };
            },
          },
          {
            path: "sign-up",
            lazy: async () => {
              const { SignUpRoute } = await import(
                "./routes/auth/sign-up/sign-up"
              );
              return { Component: SignUpRoute };
            },
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
