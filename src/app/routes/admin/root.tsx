import { Outlet } from "react-router-dom";
import { Suspense } from "react";

export const AdminRoot = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Outlet />
    </Suspense>
  );
};
