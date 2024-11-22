import { PaymentLayout } from "@/features/payment/layouts/payment-layout";
import { Box } from "@mui/material";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const PaymentRoot = () => {
  return (
    <PaymentLayout>
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
    </PaymentLayout>
  );
};
