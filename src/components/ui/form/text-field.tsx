import {
  FormControl,
  FormHelperText,
  FormLabel,
  OutlinedInput,
} from "@mui/material";
import type {
  TextFieldProps as BaseTextFieldProps,
  OutlinedInputProps,
} from "@mui/material";
import { forwardRef } from "react";

export type TextFieldProps = OutlinedInputProps &
  Pick<
    BaseTextFieldProps,
    "disabled" | "error" | "label" | "helperText" | "hiddenLabel"
  >;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextFieldInput(
    { error, disabled, label, helperText, ...props },
    ref,
  ) {
    return (
      <FormControl error={error} disabled={disabled}>
        <FormLabel>
          <span>{label}</span>
          <OutlinedInput
            ref={ref}
            fullWidth
            error={error}
            {...props}
            sx={{
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                boxShadow: "none",
                backgroundColor: "white",
                "-webkit-text-fill-color": "black",
              },
              "& .MuiOutlineInput-input:webkit-text-fill-color": {},
              "& .MuiOutlinedInput-input": { padding: "7px 14px" },
            }}
          />
        </FormLabel>
        {helperText && (
          <FormHelperText
            sx={{
              fontSize: "16px",
              color: "red",
              marginInline: "0px",
            }}
          >
            {helperText}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);
