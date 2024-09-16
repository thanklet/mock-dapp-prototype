import { forwardRef } from "react";
import { TextField as MuiTextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <MuiTextField {...props} ref={ref} />;
  },
);
