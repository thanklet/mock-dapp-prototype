import { forwardRef } from "react";
import type { SelectProps as MuiSelectProps } from "@mui/material";
import { Select as MuiSelect } from "@mui/material";
import { MenuItem } from "@mui/material";
import type { MenuItemProps } from "@mui/material";

type SelectProps = MuiSelectProps & {
  items: MenuItemProps[];
};

export const Select = forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  return (
    <MuiSelect {...props} ref={ref}>
      {props.items.map((item) => (
        <MenuItem {...item} key={item.id} />
      ))}
    </MuiSelect>
  );
});
