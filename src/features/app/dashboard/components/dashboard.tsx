import { useUser } from "@/app/providers/user-provider";
import iconHeartCheck from "@/assets/heart-check.svg";
import { Link } from "@/components/ui/link";
import { LinkButton } from "@/components/ui/link-button";
import { Typography } from "@/components/ui/typography";
import { useGetDashboard } from "@/features/app/dashboard/api";
import { useGetUser, useGetUsersByIds } from "@/features/profile/api";
import type { TransactionHistory } from "@/models/transactionHistories";
import { path } from "@/utils/path";
import { CallMade, CallReceived } from "@mui/icons-material";
import { Avatar, Box, List, ListItem, Stack } from "@mui/material";
import dayjs from "dayjs";
import { useCallback } from "react";
import { ThanksCard } from "../../components/thanks-card";

const getEmoji = (fileName: string): string => {
  return new URL(`../../../../assets/emoji/${fileName}.svg`, import.meta.url)
    .href;
};

export const Dashboard = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const userId = authorizedUser.uid;

  const [userData, transactionHistories] = useGetDashboard({
    documentId: userId,
  });

  const { data: usersInTransactionHistories } = useGetUsersByIds({
    userIds: transactionHistories.data.docs.map((transactionHistory) => ({
      documentId:
        transactionHistory.data().send_user_id === userId
          ? transactionHistory.data().receive_user_id
          : transactionHistory.data().send_user_id,
    })),
  });
  // NOTE: モックなのでユーザー存在しない場合の処理は省略
  // user.data.exists()

  const thanks = userData.data.data()?.thanks ?? 0;

  const histories = transactionHistories.data.docs.map((x) => ({
    id: x.id,
    date: dayjs(x.data().created_at.toDate()).format("YYYY-MM-DD"),
    type: x.data().send_user_id === userId ? "send" : "receive",
    thanks: x.data().thanks,
    emoji: x.data().emoji,
    userId:
      x.data().send_user_id === userId
        ? x.data().receive_user_id
        : x.data().send_user_id,
  }));
  const latestReceiveHistory = transactionHistories.data.docs.find(
    (x) => x.data().receive_user_id === userId,
  );

  const getUsernameInTransactionHistory = useCallback(
    (userId: string) => {
      return usersInTransactionHistories
        .find((user) => {
          return user.id === userId;
        })
        ?.data()?.name;
    },
    [usersInTransactionHistories],
  );

  return (
    <Stack
      spacing={"30px"}
      width={"100%"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <ThanksCard
        backgroundColor="purple"
        header={
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            gap={"20px"}
          >
            <Link to={path.get().profile.top}>
              <Avatar
                src={user?.image_path}
                sx={{
                  height: "48px",
                  width: "48px",
                }}
              />
            </Link>
            <LinkButton
              key="Wallet"
              to={path.get().app.wallet.appWallet.transfer}
              variant="contained"
              sx={{
                background: "white",
                color: "black",
                borderRadius: "20px",
                pointerEvents: "auto",
                marginBlock: "auto",
                paddingInline: "24px",
              }}
            >
              Wallet
            </LinkButton>
          </Stack>
        }
        thanks={thanks}
        linkButtons={[{ label: "Thanks", to: path.get().app.thanks.location }]}
      />
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
            width={"100%"}
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
                  maxWidth: "500px",
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
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    flexGrow: 1,
                    alignItems: "start",
                  }}
                >
                  {getUsernameInTransactionHistory(x.userId) && (
                    <Box
                      sx={{
                        display: "inline-flex",
                        gap: "8px",
                      }}
                    >
                      <Typography>{`${x.type === "send" ? "To" : "From"}:`}</Typography>
                      <Typography
                        sx={{ wordBreak: "break-word" }}
                        className="line-clamp-1"
                      >
                        {getUsernameInTransactionHistory(x.userId)}
                      </Typography>
                    </Box>
                  )}
                  <Box
                    sx={{
                      display: "flex",
                      gap: "20px",
                      width: "100%",
                      alignItems: "center",
                    }}
                  >
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
                  </Box>
                </Box>
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
          <img src={iconHeartCheck} alt="" width={36} height={36} />
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
