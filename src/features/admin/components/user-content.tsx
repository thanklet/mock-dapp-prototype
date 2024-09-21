import hospitalityUrl from "@/assets/hospitality.png";
import wishlistUrl from "@/assets/wishlist.png";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { Box, Stack } from "@mui/material";
import { IconUser } from "@tabler/icons-react";
import { TransactionTable } from "./transaction-table";

const hospitalityData = [
  {
    name: "Communication",
    value: 30,
  },
  {
    name: "Credibility",
    value: 25,
  },
  {
    name: "Contribution",
    value: 65,
  },
  {
    name: "Comprehension",
    value: 63,
  },
  {
    name: "Courtesy",
    value: 43,
  },
  {
    name: "Commonsense",
    value: 14,
  },
  {
    name: "Conception",
    value: 65,
  },
  {
    name: "Corroboration",
    value: 75,
  },
];

export const UserContent = () => {
  return (
    <>
      <Stack direction="row" spacing={2} justifyContent={"space-between"}>
        <Stack direction="row" spacing={2}>
          <Button variant="contained" startIcon={<IconUser size={20} />}>
            Overview
          </Button>
          <Button variant="text" color="inherit">
            History
          </Button>
          <Button variant="text" color="inherit">
            Profile
          </Button>
        </Stack>
        <Button
          variant="contained"
          sx={{ fontSize: "12px", borderRadius: "20px" }}
        >
          recruit
        </Button>
      </Stack>
      <Stack direction="row" spacing={2} mt={6}>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Box width={"50px"} ml={"-10px"}>
              <img src={wishlistUrl} alt="wishlist" />
            </Box>
            <Typography variant="h6" mt={2}>
              Wishlist
            </Typography>
            <Typography variant="body1" fontSize={"18px"} mt={1}>
              <Box component="span" fontWeight={"bold"} color={"orange"}>
                15
              </Box>{" "}
              Thanker in wishlist
            </Typography>
          </CardContent>
        </Card>
        <Card sx={{ width: "50%" }}>
          <CardContent>
            <Stack direction="row" spacing={2}>
              <Box width={"60%"}>
                <img src={hospitalityUrl} alt="hospitality" />
              </Box>
              <Box width={"40%"} color={"text.secondary"}>
                <dl className="flex flex-col gap-1">
                  {hospitalityData.map((item) => (
                    <div className="flex justify-between" key={item.name}>
                      <dt>{item.name}</dt>
                      <dd>{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Box mt={6}>
        <TransactionTable />
      </Box>
    </>
  );
};
