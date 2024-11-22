import { Box } from "@mui/material";
import type { ReactNode } from "react";

type PaymentLayoutProps = {
  children: ReactNode;
};

export const PaymentLayout = ({ children }: PaymentLayoutProps) => {
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
