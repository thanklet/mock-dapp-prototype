import { Avatar as MuiAvatar } from "@mui/material";
import type { AvatarProps } from "@mui/material";
import { forwardRef } from "react";

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  return <MuiAvatar {...props} ref={ref} />;
});
