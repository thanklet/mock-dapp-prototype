import { LinkButton } from "@/components/ui/link-button";
import { Typography } from "@/components/ui/typography";
import { Box, Stack } from "@mui/material";
import type { ReactNode } from "react";

type Color = "blue" | "green" | "purple";
type ThanksCardProps = {
  backgroundColor: Color;
  thanks: number;
  linkButtons: {
    label: string;
    to: string;
    isCurrentPage?: boolean;
  }[];
  header?: ReactNode;
};

const getBackgroundColor = (color: Color) => {
  switch (color) {
    case "blue": {
      return "linear-gradient(138.43deg, #73E9F1 13.63%, #1939EF 84.38%)";
    }
    case "green": {
      return "linear-gradient(138.43deg, #73F19D 13.63%, #9BDD16 84.38%)";
    }
    case "purple": {
      return "linear-gradient(138.43deg, #B673F1 13.63%, #EF19DD 84.38%)";
    }
    default: {
      const _check: never = color;
      throw new Error(`Invalid color: ${_check}`);
    }
  }
};

export const ThanksCard = ({
  backgroundColor,
  header,
  thanks,
  linkButtons,
}: ThanksCardProps) => {
  return (
    <Box
      sx={{
        background: getBackgroundColor(backgroundColor),
        borderRadius: "8px",
        padding: "20px 40px 30px",
        maxWidth: "500px",
        minHeight: "280px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
        width: "100%",
      }}
    >
      {header}
      <Typography variant="h1" color={"white"} textAlign={"right"}>
        <Box
          component={"span"}
          fontSize={"80px"}
          mr={"10px"}
          fontWeight={"bold"}
          letterSpacing={"2px"}
        >
          {thanks}
        </Box>
        <Box
          component={"span"}
          fontSize={"40px"}
          fontWeight={500}
          letterSpacing={"1px"}
        >
          THX
        </Box>
      </Typography>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        gap={"20px"}
        mt={"30px"}
      >
        {linkButtons.map(({ label, to, isCurrentPage }) => (
          <LinkButton
            key={label}
            to={to}
            variant="outlined"
            sx={{
              background: "white",
              color: "black",
              borderRadius: "20px",
              pointerEvents: "auto",
              paddingInline: "24px",
              border: isCurrentPage ? "2px solid primary" : "none",
            }}
          >
            {label}
          </LinkButton>
        ))}
      </Stack>
    </Box>
  );
};
