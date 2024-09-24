import { Paper as MuiPaper } from "@mui/material";
import type { PaperProps } from "@mui/material";
import { forwardRef } from "react";

export const Paper = forwardRef<HTMLDivElement, PaperProps>((props, ref) => {
  return <MuiPaper {...props} ref={ref} />;
});
