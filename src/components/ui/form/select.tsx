import { forwardRef, useState } from "react";
import type { SelectProps as MuiSelectProps } from "@mui/material";
import { Select as MuiSelect } from "@mui/material";
import { MenuItem } from "@mui/material";
import type { MenuItemProps, SelectChangeEvent } from "@mui/material";

type SelectProps = MuiSelectProps & {
  items: MenuItemProps[];
};

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const [value, setValue] = useState<string>(props.value as string);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
  };

  return (
    <MuiSelect
      {...props}
      ref={ref}
      value={value}
      onChange={(event) => {
        handleChange(event as SelectChangeEvent);
      }}
      sx={{
        width: "100%",
        "& .MuiSelect-select": {
          padding: "7px 14px",
        },
      }}
    >
      {props.items.map((item) => (
        <MenuItem {...item} key={item.value?.toString()} />
      ))}
    </MuiSelect>
  );
});
