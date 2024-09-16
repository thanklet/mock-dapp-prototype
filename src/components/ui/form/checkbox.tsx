import { forwardRef } from "react";
import { Checkbox as MuiCheckbox } from "@mui/material";
import type { CheckboxProps } from "@mui/material";

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    return <MuiCheckbox {...props} ref={ref} />;
  },
);
