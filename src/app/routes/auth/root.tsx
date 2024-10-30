import { AuthLayout } from "@/features/auth/layouts/auth-layout";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AuthRoot = () => {
  return (
    <AuthLayout>
      <Suspense
        fallback={
          <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Loading....
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </AuthLayout>
  );
};
