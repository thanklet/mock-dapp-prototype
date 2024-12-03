import { Head } from "@/components/seo/head";
import { UserProfileForm } from "@/features/profile/components/user-profile-form";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const EditRoute = () => {
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
        <button onClick={() => navigate(-1)} type="button">
          <ArrowBackIos sx={{ fontSize: "16px" }} />
        </button>
      </Stack>
      <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
        <Head title="Profile | Edit" />
        <UserProfileForm />
      </div>
    </>
  );
};
