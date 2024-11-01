import { useUser } from "@/app/providers/user-provider";
import staff1Url from "@/assets/dummy/1.png";
import profileBannerUrl from "@/assets/profile-banner.png";
import { path } from "@/utils/path";
import { Edit, QrCode } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconUser } from "@tabler/icons-react";
import { Link } from "../../../components/ui/link";
import { useGetUser } from "../api";

export const UserProfileCard = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();

  if (!user) {
    return null;
  }

  return (
    <Card className="relative h-[500px]">
      <img
        src={profileBannerUrl}
        alt=""
        className="h-1/2 object-cover"
        aria-hidden
      />
      <CardContent className="flex flex-col items-center gap-y-5">
        <Link
          to={path.get().profile.qr}
          className="absolute top-4 left-4 hover:opacity-80"
        >
          <QrCode
            fontSize="large"
            className="text-white"
            aria-label="Link to QR Code"
          />
        </Link>
        <Link
          to={path.get().profile.edit}
          className="flex gap-x-2 items-center absolute top-6 right-4 px-2 py-1 hover:opacity-80"
        >
          <Edit
            aria-labelledby="edit"
            fontSize="small"
            className="text-white"
          />
          <div id="edit" className="text-white hover:cursor-pointer">
            Edit
          </div>
        </Link>
        <div className="flex flex-col gap-y-3 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%]">
          <div className="flex flex-col items-center gap-y-5 border-[5px]  border-white rounded bg-white w-fit">
            <Avatar
              alt="staff1"
              src={staff1Url}
              sx={{
                width: 120,
                height: 120,
              }}
              variant="rounded"
            />
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 500,
                color: "#2f2b3d",
              }}
            >
              {user.name}
            </Typography>
          </div>
          <div className="flex gap-x-1.5">
            <div className="flex gap-x-1.5">
              <IconUser
                aria-hidden
                aria-describedby="user-id"
                className="text-[rgba(0,0,0,0.6)]"
              />
              <Typography
                id="user-id"
                className="font-medium"
                color="text.secondary"
              >
                ID
              </Typography>
            </div>
            <Typography className="font-medium" color="text.secondary">
              {`@${authorizedUser.uid}`}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
