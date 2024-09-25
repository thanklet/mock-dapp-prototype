import { AdminLayout } from "@/features/admin/layouts/admin-layout";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

export const AdminRoot = () => {
  return (
    <AdminLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </AdminLayout>
  );
};
