import copy from "@/assets/copy.svg";
import { Typography } from "@/components/ui/typography";
import { Box, Stack } from "@mui/material";

export const CardHeader = () => {
  const ID = "HUowR******TnVP9J";
  const handleCopy = () => {
    navigator.clipboard.writeText(ID);
  };

  return (
    <Stack alignItems="center">
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        sx={{
          background: "white",
          borderRadius: "20px",
          padding: "3px 30px",
        }}
      >
        <Typography
          sx={{
            opacity: 0.5,
          }}
        >
          {ID}
        </Typography>
        <button type="button" onClick={handleCopy}>
          <img src={copy} alt="copy" className="w-3 h-3 opacity-50" />
        </button>
      </Stack>
      <Stack direction="row" spacing={5}>
        <Typography sx={{ color: "white" }}>
          <Box component="span" sx={{ fontSize: "40px", fontWeight: 700 }}>
            2
          </Box>{" "}
          SOL
        </Typography>
        <Typography sx={{ color: "white" }}>
          <Box component="span" sx={{ fontSize: "40px", fontWeight: 700 }}>
            120
          </Box>{" "}
          USDC
        </Typography>
      </Stack>
    </Stack>
  );
};
