import { Head } from "@/components/seo/head";
import { useParams } from "react-router-dom";
import { UserView } from "@/features/admin/components/user-view";

export const UserRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={`ユーザー: ${userId}`} />
      <UserView />
    </>
  );
};
