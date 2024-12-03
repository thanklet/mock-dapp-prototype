import { Head } from "@/components/seo/head";
import { UserProfileCard } from "@/features/profile/components/user-profile-card";
import { path } from "@/utils/path";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ProfileRoute = () => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction="row"
        p={"10px"}
        alignItems="center"
        sx={{
          width: "100%",
        }}
      >
        <button
          onClick={() => navigate(path.get().app.dashboard)}
          type="button"
        >
          <ArrowBackIos sx={{ fontSize: "16px" }} />
        </button>
      </Stack>
      <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
        <Head title="Profile" />
        <UserProfileCard />
      </div>
    </>
  );
};
