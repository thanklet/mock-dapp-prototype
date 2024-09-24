import type { CardProps } from "@mui/material";
import { Card as MuiCard } from "@mui/material";
import { forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <MuiCard {...props} ref={ref} />;
});
