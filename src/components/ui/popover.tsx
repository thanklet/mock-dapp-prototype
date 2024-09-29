import { Popover as MuiPopover } from "@mui/material";
import type { PopoverProps } from "@mui/material";
import { forwardRef } from "react";

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (props, ref) => {
    return <MuiPopover ref={ref} {...props} />;
  },
);
