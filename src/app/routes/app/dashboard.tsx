import { Head } from "@/components/seo/head";
import { Dashboard } from "@/features/app/dashboard/components/dashboard";
import { useParams } from "react-router-dom";

export const DashboardRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={`ユーザー: ${userId}`} />
      <Dashboard />
    </>
  );
};
