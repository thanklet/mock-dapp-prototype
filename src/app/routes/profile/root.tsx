import { ProfileLayout } from "@/features/profile/layouts/profile-layout";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const ProfileRoot = () => {
  return (
    <ProfileLayout>
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
    </ProfileLayout>
  );
};
