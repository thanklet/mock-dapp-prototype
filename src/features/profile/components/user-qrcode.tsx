import { useUser } from "@/app/providers/user-provider";
import staff1Url from "@/assets/dummy/1.png";
import qrCodeUrl from "@/assets/qr-code.svg";
import { useGetUser } from "@/features/app/thanks/send/api";
import { Avatar } from "@mui/material";

export const UserQrCode = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center flex-col gap-1">
        <div className="flex flex-col items-center gap-1">
          <Avatar
            alt="staff1"
            src={staff1Url}
            sx={{
              width: 120,
              height: 120,
            }}
          />
          <div className="font-bold">{`@${user.name}`}</div>
        </div>
        <img src={qrCodeUrl} alt="QR Code" className="size-[250px]" />
      </div>
    </div>
  );
};
