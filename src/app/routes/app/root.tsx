import { AppLayout } from "@/features/app/layouts/app-layout";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AppRoot = () => {
  return (
    <AppLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
};
