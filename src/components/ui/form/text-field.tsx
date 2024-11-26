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
  Pick<BaseTextFieldProps, "disabled" | "error" | "label" | "helperText">;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  function TextFieldInput(
    { error, disabled, label, helperText, ...props },
    ref,
  ) {
    return (
      <FormControl error={error} disabled={disabled} className="w-full">
        <FormLabel className="w-full flex flex-col">
          <span className="text-[13px]">{label}</span>
          <OutlinedInput
            ref={ref}
            fullWidth
            error={error}
            {...props}
            sx={{
              "& .MuiOutlinedInput-input:-webkit-autofill": {
                boxShadow: "none",
                backgroundColor: "white",
                caretColor: "black",
                WebkitTextFillColor: "black",
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
