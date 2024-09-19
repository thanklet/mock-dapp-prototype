import { Checkbox as MuiCheckbox } from "@mui/material";
import type { CheckboxProps } from "@mui/material";
import { forwardRef } from "react";

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (props, ref) => {
    return <MuiCheckbox {...props} ref={ref} />;
  },
);
