import { Slider as MuiSlider } from "@mui/material";
import type { SliderProps } from "@mui/material";
import { forwardRef } from "react";

export const Slider = forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  return <MuiSlider {...props} ref={ref} />;
});
