import { LinkButton } from "@/components/ui/link-button";
import { Typography } from "@/components/ui/typography";
import { useGetDashboard } from "@/features/app/dashboard/api";
import type { TransactionHistory } from "@/models/transactionHistories";
import { path } from "@/utils/path";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Box, List, ListItem, Stack } from "@mui/material";
import { IconHeartCheck } from "@tabler/icons-react";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const getEmoji = (fileName: string): string => {
  return new URL(`../../../../assets/emoji/${fileName}.svg`, import.meta.url)
    .href;
};

export const Dashboard = () => {
  const { userId } = useParams();

  const [user, transactionHistories] = useGetDashboard({
    documentId: userId ?? "",
  });
  // NOTE: モックなのでユーザー存在しない場合の処理は省略
  // user.data.exists()

  const buttonData = [
    {
      label: "Thanks",
      to: path.get().app.userId.thanks.location(userId),
      disabled: false,
    },
    {
      label: "Swap",
      to: path.get().app.userId.swap(userId),
      disabled: true,
    },
    {
      label: "Staking",
      to: path.get().app.userId.staking(userId),
      disabled: true,
    },
  ];

  const thanks = user.data.data()?.thanks ?? 0;

  const histories = transactionHistories.data.docs.map((x) => ({
    id: x.id,
    date: dayjs(x.data().created_at.toDate()).format("YYYY-MM-DD"),
    type: x.data().send_user_id === userId ? "send" : "receive",
    thanks: x.data().thanks,
    emoji: x.data().emoji,
  }));
  const latestReceiveHistory = transactionHistories.data.docs.find(
    (x) => x.data().receive_user_id === userId,
  );

  return (
    <Stack spacing={"30px"}>
      <Box pt={"30px"} px={"20px"}>
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
              {thanks}
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
                  pointerEvents: item.disabled ? "none" : "auto",
                }}
              >
                {item.label}
              </LinkButton>
            ))}
          </Stack>
        </Box>
      </Box>

      {latestReceiveHistory && (
        <LatestReceive {...latestReceiveHistory.data()} />
      )}

      {histories.length > 0 && (
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
            {histories.map((x, i) => (
              <ListItem
                key={x.id}
                sx={{
                  borderTop: "1px solid #E0E0E0",
                  borderBottom:
                    i === histories.length - 1 ? "1px solid #E0E0E0" : "none",
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
                    <img src={getEmoji(x.emoji)} alt="emoji" />
                  </Stack>
                  <Typography
                    variant="body1"
                    fontSize={"14px"}
                    textAlign={"center"}
                  >
                    {x.date}
                  </Typography>
                </Stack>
                <Box>
                  {
                    {
                      receive: (
                        <CallReceived
                          sx={{ color: "success.main", fontSize: "50px" }}
                        />
                      ),
                      send: (
                        <CallMade
                          sx={{ color: "error.main", fontSize: "50px" }}
                        />
                      ),
                    }[x.type]
                  }
                  <Typography
                    variant="body1"
                    fontSize={"16px"}
                    fontWeight={"bold"}
                  >
                    {x.type}
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
                    {x.thanks}
                  </Box>
                  THX
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Stack>
  );
};

const LatestReceive = ({ thanks, emoji }: TransactionHistory) => {
  return (
    <Stack px={"20px"} spacing={"5px"} alignItems={"center"}>
      <Typography
        variant="body1"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        gap={"10px"}
      >
        <Box component={"span"} color={"success.main"}>
          <IconHeartCheck />
        </Box>
        You have received a Thank You!
      </Typography>
      <Box width={"150px"}>
        <img src={getEmoji(emoji)} alt="emoji" />
      </Box>
      <Typography
        variant="body1"
        ml={"auto"}
        fontSize={"22px"}
        color="text.secondary"
      >
        <Box
          component={"span"}
          mr={"5px"}
          fontSize={"40px"}
          fontWeight={"bold"}
        >
          {thanks ?? 0}
        </Box>
        THX
      </Typography>
    </Stack>
  );
};
