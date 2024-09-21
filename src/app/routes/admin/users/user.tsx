import { Head } from "@/components/seo/head";
import { useParams } from "react-router-dom";

export const UserRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={`ユーザー: ${userId}`} />
      <p>ユーザー</p>
    </>
  );
};
