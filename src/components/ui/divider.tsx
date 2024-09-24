import { Divider as MuiDivider } from "@mui/material";
import type { DividerProps } from "@mui/material";
import { forwardRef } from "react";

export const Divider = forwardRef<HTMLHRElement, DividerProps>((props, ref) => {
  return <MuiDivider {...props} ref={ref} />;
});
