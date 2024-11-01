import { Box } from "@mui/material";
import type { ReactNode } from "react";

type ProfileLayout = {
  children: ReactNode;
};

export const ProfileLayout = ({ children }: ProfileLayout) => {
  return (
    <Box
      sx={{
        maxWidth: "767px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {children}
    </Box>
  );
};
