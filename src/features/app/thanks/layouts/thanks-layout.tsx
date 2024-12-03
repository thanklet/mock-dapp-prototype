import { LinkTabs } from "@/components/ui/link-tabs";
import { path } from "@/utils/path";
import { ArrowBackIos } from "@mui/icons-material";
import { Stack } from "@mui/material";
import { Typography } from "@mui/material";
import type { ComponentProps, ReactNode } from "react";
import type { To } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type ThanksLayoutProps = {
  label: string;
  children: ReactNode;
  linkTabsProps?: ComponentProps<typeof LinkTabs>;
  backPath: "dashboard" | "back";
};

export const ThanksLayout = ({
  label,
  children,
  linkTabsProps,
  backPath,
}: ThanksLayoutProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction="column"
        p={"10px"}
        sx={{
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.1)",
          paddingTop: "30px",
        }}
      >
        <Stack direction="row" alignItems="center">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              navigate(
                backPath === "dashboard"
                  ? path.get().app.dashboard
                  : (-1 as To),
              );
            }}
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
        {linkTabsProps && <LinkTabs {...linkTabsProps} />}
      </Stack>
      {children}
    </>
  );
};
