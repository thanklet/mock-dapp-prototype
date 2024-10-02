import { AppLayout } from "@/features/app/layouts/app-layout";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AppRoot = () => {
  return (
    <AppLayout>
      <Suspense
        fallback={
          <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            Loading...
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};
