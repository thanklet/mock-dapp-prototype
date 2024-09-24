import { Typography as MuiTypography } from "@mui/material";
import type { TypographyProps } from "@mui/material";
import { forwardRef } from "react";

export const Typography = forwardRef<HTMLHeadingElement, TypographyProps>(
  (props, ref) => {
    return <MuiTypography {...props} ref={ref} />;
  },
);
