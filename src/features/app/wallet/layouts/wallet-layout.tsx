import { path } from "@/utils/path";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type WalletLayoutProps = {
  label: string;
  children: ReactNode;
};

export const WalletLayout = ({ label, children }: WalletLayoutProps) => {
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
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            flex: 1,
            textAlign: "center",
            pr: "26px",
          }}
        >
          {label}
        </Typography>
      </Stack>
      {children}
    </>
  );
};
