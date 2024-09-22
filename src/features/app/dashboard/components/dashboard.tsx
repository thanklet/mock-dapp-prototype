import emojiHappyUrl from "@/assets/emoji/happy.svg";
import emojiHelpfulUrl from "@/assets/emoji/helpful.svg";
import { LinkButton } from "@/components/ui/link-button";
import { Typography } from "@/components/ui/typography";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Box, List, ListItem, Stack } from "@mui/material";
import { useParams } from "react-router-dom";

export const Dashboard = () => {
  const { userId } = useParams();
  const THANKS = "892";
  const buttonData = [
    {
      label: "Thanks",
      to: `/app/${userId}/location`,
      isClickable: true,
    },
    {
      label: "Swap",
      to: `/app/${userId}/swap`,
      isClickable: false,
    },
    {
      label: "Staking",
      to: `/app/${userId}/staking`,
      isClickable: false,
    },
  ];

  const transactionData = [
    {
      id: 1,
      emoji: emojiHappyUrl,
      date: "2024-08-31",
      type: "receive",
      thanks: 1,
    },
    {
      id: 2,
      emoji: emojiHelpfulUrl,
      date: "2024-08-31",
      type: "send",
      thanks: 1,
    },
  ];

  return (
    <Stack spacing={"30px"}>
      <Box p={"30px"} px={"20px"}>
        <Box
          sx={{
            background:
              "linear-gradient(138.43deg, #B673F1 13.63%, #EF19DD 84.38%)",
            borderRadius: "8px",
            padding: "90px 20px 30px",
          }}
        >
          <Typography
            variant="h1"
            color={"white"}
            fontWeight={"bold"}
            fontSize={"26px"}
            textAlign={"right"}
          >
            <Box component={"span"} fontSize={"40px"} mr={"10px"}>
              {THANKS}
            </Box>
            THX
          </Typography>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={"20px"}
            mt={"30px"}
          >
            {buttonData.map((item) => (
              <LinkButton
                key={item.label}
                to={item.to}
                variant="contained"
                sx={{
                  width: "100%",
                  background: "white",
                  color: "black",
                  borderRadius: "20px",
                  pointerEvents: item.isClickable ? "auto" : "none",
                }}
              >
                {item.label}
              </LinkButton>
            ))}
          </Stack>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="h2"
          px={"20px"}
          fontWeight={"bold"}
          fontSize={"16px"}
        >
          Transaction
        </Typography>
        <List sx={{ padding: "0", marginTop: "20px" }}>
          {transactionData.map((item, index) => (
            <ListItem
              key={item.id}
              sx={{
                borderTop: "1px solid #E0E0E0",
                borderBottom:
                  index === transactionData.length - 1
                    ? "1px solid #E0E0E0"
                    : "none",
                padding: "15px 30px",
                display: "flex",
                gap: "20px",
              }}
            >
              <Stack width={"100px"} spacing={"5px"}>
                <Stack
                  width={"100px"}
                  height={"100px"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <img src={item.emoji} alt="emoji" />
                </Stack>
                <Typography
                  variant="body1"
                  fontSize={"14px"}
                  textAlign={"center"}
                >
                  {item.date}
                </Typography>
              </Stack>
              <Box>
                {item.type === "receive" ? (
                  <CallReceived sx={{ color: "#1ADB00", fontSize: "50px" }} />
                ) : (
                  <CallMade sx={{ color: "#E90000", fontSize: "50px" }} />
                )}
                <Typography
                  variant="body1"
                  fontSize={"16px"}
                  fontWeight={"bold"}
                >
                  {item.type === "receive" ? "receive" : "send"}
                </Typography>
              </Box>
              <Typography
                variant="body1"
                ml={"auto"}
                fontSize={"18px"}
                color="text.secondary"
              >
                <Box
                  component={"span"}
                  mr={"5px"}
                  fontSize={"30px"}
                  fontWeight={"bold"}
                >
                  {item.thanks}
                </Box>
                THX
              </Typography>
            </ListItem>
          ))}
        </List>
      </Box>
    </Stack>
  );
};
