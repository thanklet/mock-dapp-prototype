import { Head } from "@/components/seo/head";
import { UserListTable } from "@/features/admin/components/user-list-table";

export const UsersRoute = () => {
  return (
    <>
      <Head title="ユーザー一覧" />
      <UserListTable />
    </>
  );
};
