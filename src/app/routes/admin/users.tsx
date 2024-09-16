import { useState } from "react";
import viteLogo from "/vite.svg";
import reactLogo from "@/assets/react.svg";
import { Button } from "@mui/material";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const Users = () => {
  const [count, setCount] = useState(0);

  return (
    <AdminLayout title="ユーザー一覧">
      <p>ユーザー一覧</p>
    </AdminLayout>
  );
};
