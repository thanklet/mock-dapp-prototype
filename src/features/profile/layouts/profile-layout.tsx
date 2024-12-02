import { path } from "@/utils/path";
import { ArrowBackIos } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ProfileLayoutProps = {
  children: ReactNode;
};

export const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        maxWidth: "767px",
        margin: "0 auto",
        minHeight: "100vh",
        paddingTop: "30px",
        paddingInline: "20px",
      }}
    >
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
      {children}
    </Box>
  );
};
