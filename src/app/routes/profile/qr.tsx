import { Head } from "@/components/seo/head";
import { UserQrCode } from "@/features/profile/components/user-qrcode";

export const QrRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[60px] px-5">
      <Head title="Profile | QR" />
      <UserQrCode />
    </div>
  );
};
