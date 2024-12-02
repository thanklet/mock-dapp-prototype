import { Head } from "@/components/seo/head";
import { UserProfileCard } from "@/features/profile/components/user-profile-card";

export const ProfileRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="Profile" />
      <UserProfileCard />
    </div>
  );
};
