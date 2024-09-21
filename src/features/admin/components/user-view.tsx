import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import { UserDetails } from "./user-details";

export const UserView = () => {
  const { userId } = useParams();
  return (
    <Stack spacing={"24px"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box>
          <Typography>Customer ID #{userId}</Typography>
          <Typography>Aug 17, 2020, 5:48(ET)</Typography>
        </Box>
        <Button variant="contained" color="error">
          Delete Customer
        </Button>
      </Stack>
      <Box display={"flex"} justifyContent={"space-between"} gap={"24px"}>
        <Box width={"30%"}>
          <UserDetails />
        </Box>
      </Box>
    </Stack>
  );
};
