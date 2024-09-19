import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const AdminRoot = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  );
};
