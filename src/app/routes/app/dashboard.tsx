import { useUser } from "@/app/providers/user-provider.tsx";
import { Head } from "@/components/seo/head";
import { Dashboard } from "@/features/app/dashboard/components/dashboard";

export const DashboardRoute = () => {
  const { user } = useUser();
  return (
    <>
      <Head title={`ユーザー: ${user.uid}`} />
      <Dashboard />
    </>
  );
};
