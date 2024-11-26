import { FormControl, FormLabel, MenuItem, TextField } from "@mui/material";
import type { MenuItemProps, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";

export type PulldownProps = TextFieldProps & {
  items: MenuItemProps[];
};

export const Pulldown = forwardRef<HTMLDivElement, PulldownProps>(
  ({ disabled, error, label, items, value, ...props }, ref) => {
    return (
      <FormControl error={error} disabled={disabled} className="w-full">
        <FormLabel className="w-full flex flex-col">
          <span className="text-[13px]">{label}</span>
          <TextField
            ref={ref}
            select
            variant="outlined"
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
          >
            {items.map((item) => (
              <MenuItem {...item} key={item.value?.toString()} />
            ))}
          </TextField>
        </FormLabel>
      </FormControl>
    );
  },
);
