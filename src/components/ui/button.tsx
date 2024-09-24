import type { ButtonProps } from "@mui/material";
import MuiButton from "@mui/material/Button";
import { forwardRef } from "react";

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <MuiButton ref={ref} {...props} />;
  },
);
