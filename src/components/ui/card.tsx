import type { CardProps, CardContentProps } from "@mui/material";
import { Card as MuiCard, CardContent as MuiCardContent } from "@mui/material";
import { forwardRef } from "react";

export const Card = forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  return <MuiCard {...props} ref={ref} />;
});

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  (props, ref) => {
    return <MuiCardContent {...props} ref={ref} />;
  },
);
