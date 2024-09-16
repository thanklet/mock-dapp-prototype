import { forwardRef } from "react";
import { TextField as MuiTextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material";

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return (
      <MuiTextField
        {...props}
        sx={{
          "& .MuiOutlinedInput-root": { borderRadius: "8px" },
          "& .MuiOutlinedInput-input": { padding: "7px 14px" },
        }}
        ref={ref}
      />
    );
  },
);