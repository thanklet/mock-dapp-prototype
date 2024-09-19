import { UserListTable } from "@/features/admin/components/user-list-table";
import { Head } from "@/components/seo/head";

export const Users = () => {
  return (
    <>
      <Head title="ユーザー一覧" />
      <UserListTable />
    </>
  );
};
