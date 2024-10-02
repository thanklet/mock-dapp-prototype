import { AdminLayout } from "@/features/admin/layouts/admin-layout";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AdminRoot = () => {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};
