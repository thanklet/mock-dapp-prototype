import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { forwardRef, useState } from "react";
import { TextField, type TextFieldProps } from "./text-field";

export const PasswordField = forwardRef<HTMLInputElement, TextFieldProps>(
  function PasswordFieldInput(props, ref) {
    const [shouldShowPassword, setShouldShowPassword] = useState(false);

    return (
      <TextField
        {...props}
        ref={ref}
        type={shouldShowPassword ? "text" : "password"}
        placeholder="············"
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={() => setShouldShowPassword((prev) => !prev)}>
              {shouldShowPassword ? (
                <Visibility fontSize="small" />
              ) : (
                <VisibilityOff fontSize="small" />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    );
  },
);
