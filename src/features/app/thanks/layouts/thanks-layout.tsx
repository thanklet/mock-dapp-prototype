import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type ThanksLayoutProps = {
  label: string;
  children: ReactNode;
};

export const ThanksLayout = ({ label, children }: ThanksLayoutProps) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack
        direction="row"
        p={"10px"}
        alignItems="center"
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        <button onClick={() => navigate(-1)} type="button">
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
