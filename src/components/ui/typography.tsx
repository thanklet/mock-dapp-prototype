import { forwardRef } from "react";
import { Typography as MuiTypography } from "@mui/material";
import type { TypographyProps } from "@mui/material";

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props, ref) => {
    return <MuiTypography {...props} ref={ref} />;
  },
);
