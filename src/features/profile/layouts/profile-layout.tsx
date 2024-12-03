import { Box } from "@mui/material";
import type { ReactNode } from "react";

type ProfileLayoutProps = {
  children: ReactNode;
};

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <Box
      sx={{
        maxWidth: "767px",
        margin: "0 auto",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingInline: "20px",
      }}
    >
      {children}
    </Box>
  );
};
