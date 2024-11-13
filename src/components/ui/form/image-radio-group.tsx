import { Box, FormControl, Radio, RadioGroup } from "@mui/material";
import type { RadioGroupProps } from "@mui/material";
import { forwardRef, useState } from "react";

type ImageRadioGroupProps = RadioGroupProps & {
  items: {
    value: string;
    image: string;
  }[];
};

export const ImageRadioGroup = forwardRef<HTMLDivElement, ImageRadioGroupProps>(
  ({ items, ...props }, ref) => {
    const [value, setValue] = useState(items[0].value);
    return (
      <FormControl>
        <RadioGroup
          ref={ref}
          {...props}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "10px",
          }}
        >
          {items.map((item) => (
            <Radio
              key={item.value}
              value={item.value}
              sx={{
                borderRadius: "0px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              icon={
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    padding: "7px",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.value}
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              }
              checkedIcon={
                <Box
                  sx={{
                    width: "100%",
                    height: "auto",
                    border: "2px solid #7367F0",
                    borderRadius: "10px",
                    padding: "5px",
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.value}
                    sx={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              }
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  },
);
