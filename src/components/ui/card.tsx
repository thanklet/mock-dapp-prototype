import { forwardRef } from "react";
import type { CardProps } from "@mui/material";
import { Card as MuiCard } from "@mui/material";

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <MuiCard {...props} ref={ref} />;
});
