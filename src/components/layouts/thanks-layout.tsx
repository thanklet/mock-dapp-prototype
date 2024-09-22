import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
type ThanksLayoutProps = {
  backTo: string;
  label: string;
  children: ReactNode;
};

export const ThanksLayout = ({
  backTo,
  label,
  children,
}: ThanksLayoutProps) => {
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
        <Link to={backTo} style={{ lineHeight: 1 }}>
          <ArrowBackIos sx={{ fontSize: "16px" }} />
        </Link>
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
