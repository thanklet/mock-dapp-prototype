import { AdminLayout } from "@/components/layouts/admin-layout";
import { UserListTable } from "@/features/admin/components/user-list-table";

export const Users = () => {
  return (
    <AdminLayout title="ユーザー一覧">
      <UserListTable />
    </AdminLayout>
  );
};
