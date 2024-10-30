import { Box } from "@mui/material";
import type { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout = ({ children }: AuthLayoutProps) => {
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
