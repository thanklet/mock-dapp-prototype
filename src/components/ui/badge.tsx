import { Badge as MuiBadge } from "@mui/material";
import type { BadgeProps } from "@mui/material";
import { forwardRef } from "react";

export const Badge = forwardRef<HTMLDivElement, BadgeProps>((props, ref) => {
  return <MuiBadge {...props} ref={ref} />;
});
