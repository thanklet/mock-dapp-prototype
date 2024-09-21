import { Head } from "@/components/seo/head";
import { UserView } from "@/features/admin/components/user-view";
import { useParams } from "react-router-dom";

export const UserRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={`ユーザー: ${userId}`} />
      <UserView />
    </>
  );
};
