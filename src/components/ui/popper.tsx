import { Popper as MuiPopper } from "@mui/material";
import type { PopperProps } from "@mui/material";
import { forwardRef } from "react";

export const Popper = forwardRef<HTMLDivElement, PopperProps>((props, ref) => {
  return <MuiPopper {...props} ref={ref} />;
});
