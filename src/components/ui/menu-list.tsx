import { MenuList as MuiMenuList } from "@mui/material";
import type { MenuListProps } from "@mui/material";
import { forwardRef } from "react";

export const MenuList = forwardRef<HTMLUListElement, MenuListProps>(
  (props, ref) => {
    return <MuiMenuList {...props} ref={ref} />;
  },
);
