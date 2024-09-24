import { Chip as MuiChip } from "@mui/material";
import type { ChipProps } from "@mui/material/Chip";
import { forwardRef } from "react";

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  return (
    <MuiChip
      {...props}
      sx={{
        borderRadius: 1,
        height: 20,
        fontSize: 14,
        ...props.sx,
      }}
      ref={ref}
    />
  );
});
