import { Head } from "@/components/seo/head";
import { UserProfileForm } from "@/features/profile/components/user-profile-form";

export const EditRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="Profile | Edit" />
      <UserProfileForm />
    </div>
  );
};
