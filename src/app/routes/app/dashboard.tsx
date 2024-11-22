import { useUser } from "@/app/providers/user-provider.tsx";
import { Head } from "@/components/seo/head";
import { Dashboard } from "@/features/app/dashboard/components/dashboard";

export const DashboardRoute = () => {
  const { user } = useUser();
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5 mt-16">
      <Head title={`ユーザー: ${user.uid}`} />
      <Dashboard />
    </div>
  );
};
