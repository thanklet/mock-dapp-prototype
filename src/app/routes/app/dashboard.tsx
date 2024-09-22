import { Head } from "@/components/seo/head";
import { useParams } from "react-router-dom";
import { Dashboard } from "@/features/app/dashboard/components/dashboard";

export const DashboardRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={`ユーザー: ${userId}`} />
      <Dashboard />
    </>
  );
};
