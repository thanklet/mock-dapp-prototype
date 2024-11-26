import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputAdornment,
  MenuItem,
  OutlinedInput,
  TextField,
} from "@mui/material";
import type {
  TextFieldProps as BaseTextFieldProps,
  MenuItemProps,
  OutlinedInputProps,
  TextFieldProps,
} from "@mui/material";
import { forwardRef } from "react";

export type TextFieldPulldownProps = OutlinedInputProps &
  Pick<BaseTextFieldProps, "disabled" | "error" | "label" | "helperText"> & {
    pulldownProps: TextFieldProps & {
      items: MenuItemProps[];
    };
  };

export const TextFieldPulldown = forwardRef<
  HTMLInputElement,
  TextFieldPulldownProps
>(function TextFieldInput(
  { error, disabled, label, helperText, pulldownProps, ...props },
  ref,
) {
  const { items, ...restPulldownProps } = pulldownProps;
  return (
    <FormControl error={error} disabled={disabled} className="w-full">
      <FormLabel className="w-full flex flex-col">
        <span className="text-[13px]">{label}</span>
        <OutlinedInput
          ref={ref}
          fullWidth
          error={error}
          endAdornment={
            <InputAdornment position="end">
              <TextField
                select
                {...restPulldownProps}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      border: "none",
                    },
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                  },
                }}
              >
                {items.map((item) => (
                  <MenuItem {...item} key={item.value?.toString()} />
                ))}
              </TextField>
            </InputAdornment>
          }
          {...props}
          sx={{
            paddingRight: "0px",
            "& .MuiOutlinedInput-input:-webkit-autofill": {
              boxShadow: "none",
              backgroundColor: "white",
              caretColor: "black",
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
});
