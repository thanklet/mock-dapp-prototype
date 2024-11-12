import amazon from "@/assets/amazon.png";
import copy from "@/assets/copy.svg";
import { Typography } from "@/components/ui/typography";
import { Box, Stack } from "@mui/material";

export const Complete = () => {
  const ID = "CPKS-7HJZ8W-4HCV";
  const handleCopy = () => {
    navigator.clipboard.writeText(ID);
  };
  return (
    <div className="flex flex-col gap-y-8 max-w-[500px] w-full">
      <Stack alignItems="center" gap={1}>
        <Typography variant="h4">Amazon 25000 LPY</Typography>
        <Box>
          <img src={amazon} alt="amazon" />
        </Box>
      </Stack>
      <dl className="flex flex-col gap-y-4 px-10 py-3 border-t border-b border-[black]">
        <div className="flex justify-between">
          <dt className="w-[50%]">Code</dt>
          <dd className="w-[50%] flex justify-center gap-x-2">
            {ID}
            <button type="button" onClick={handleCopy}>
              <img src={copy} alt="copy" className="w-3 h-3" />
            </button>
          </dd>
        </div>
        <div className="flex justify-between">
          <dt className="w-[50%]">Expiration date</dt>
          <dd className="w-[50%] text-center">-</dd>
        </div>
      </dl>
    </div>
  );
};
