import { useUser } from "@/app/providers/user-provider.tsx";
import staff1Url from "@/assets/dummy/1.png";
import emojiHappyUrl from "@/assets/emoji/happy.svg";
import emojiHelpfulUrl from "@/assets/emoji/helpful.svg";
import sentUrl from "@/assets/sent.svg";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/form/slider";
import { Popover } from "@/components/ui/popover";
import { Typography } from "@/components/ui/typography";
import { path } from "@/utils/path.ts";
import { Add, Remove } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { Timestamp } from "firebase/firestore";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetUser, useSendThanks } from "../api";

// 定数
const THANKS_BUTTON_VALUES = ["1", "2", "5"];
const EMOJI_DATA = [
  {
    value: "happy",
    url: emojiHappyUrl,
    label: "Happy",
  },
  {
    value: "helpful",
    url: emojiHelpfulUrl,
    label: "Helpful",
  },
];

type Emoji = {
  value: string;
  url: string;
};

export const Send = () => {
  const { receiveUserId } = useParams();
  const { user } = useUser();
  const userId = user.uid;

  const [selectedEmoji, setSelectedEmoji] = useState<Emoji>(EMOJI_DATA[0]);
  const [currentThanksValue, setCurrentThanksValue] = useState<string | null>(
    null,
  );
  const [sliderValue, setSliderValue] = useState(0);
  const [isSent, setIsSent] = useState(false);

  const handleSelectEmoji = (emoji: { value: string; url: string }) => {
    setSelectedEmoji(emoji);
  };

  const handleSelectThanks = (value: string) => {
    setCurrentThanksValue(value);
    setSliderValue(0);
  };

  const handleChangeSlider = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setSliderValue(newValue);
      setCurrentThanksValue(null);
    }
  };

  const { data: sendUser } = useGetUser({ documentId: userId });
  const { data: receiveUser } = useGetUser({ documentId: receiveUserId ?? "" });
  const sendUserThanks = sendUser.data()?.thanks ?? 0;

  const queryClient = useQueryClient();
  const onSuccessSendThanks = () => {
    setIsSent(true);
    queryClient.invalidateQueries({ queryKey: ["transaction_histories"] });
  };

  const { mutate: sendThanks } = useSendThanks(onSuccessSendThanks);

  const handleSendThanks = async () => {
    const thanks = Number(currentThanksValue ?? sliderValue);
    const receiveUserThanks = receiveUser.data()?.thanks ?? 0;
    await sendThanks({
      transactionHistory: {
        emoji: selectedEmoji.value,
        send_user_id: userId,
        receive_user_id: receiveUserId ?? "",
        thanks: thanks,
        created_at: Timestamp.now(),
      },
      sendUserThanks: sendUserThanks - thanks,
      receiveUserThanks: receiveUserThanks + thanks,
    });
  };

  // popover
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosePopover = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  return (
    <Stack
      spacing={"30px"}
      sx={{
        backgroundColor: "background.default",
        padding: "30px 20px",
        height: "calc(100svh - 44px)",
      }}
    >
      <Stack alignItems="center" gap={"10px"}>
        <Avatar
          alt={receiveUser.data()?.name}
          src={receiveUser.data()?.image_path}
          sx={{
            width: 100,
            height: 100,
            border: "2px solid",
            borderColor: "secondary.main",
          }}
        />
        <Typography variant="h2" fontSize={"26px"}>
          {receiveUser.data()?.name}
        </Typography>
      </Stack>

      <Card>
        <CardContent sx={{ padding: "0" }}>
          <Stack
            direction="row"
            flexWrap={"nowrap"}
            spacing={"10px"}
            overflow={"auto"}
            padding={"10px"}
            borderBottom={"1px solid #E0E0E0"}
          >
            {EMOJI_DATA.map((emoji) => (
              <Stack key={emoji.value} width={"50px"} sx={{ flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() =>
                    handleSelectEmoji({
                      value: emoji.value,
                      url: emoji.url,
                    })
                  }
                >
                  <img src={emoji.url} alt={emoji.label} />
                </button>
              </Stack>
            ))}
          </Stack>

          <Stack alignItems={"center"} padding={"20px 30px"}>
            {!isSent ? (
              <>
                <Box
                  width={"120px"}
                  height={"120px"}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  marginBottom={"20px"}
                >
                  <img src={selectedEmoji.url} alt="selected emoji" />
                </Box>

                <Stack spacing={"5px"}>
                  <Stack direction={"row"} spacing={"15px"}>
                    {THANKS_BUTTON_VALUES.map((value) => (
                      <Button
                        key={value}
                        variant={
                          currentThanksValue === value
                            ? "contained"
                            : "outlined"
                        }
                        color="secondary"
                        sx={{
                          display: "flex",
                          gap: "5px",
                          fontSize: "16px",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleSelectThanks(value)}
                        disabled={Number(value) > sendUserThanks}
                      >
                        <Box
                          component={"span"}
                          fontSize={"28px"}
                          lineHeight={"1"}
                        >
                          {value}
                        </Box>
                        <Box component={"span"} paddingTop={"5px"}>
                          THX
                        </Box>
                      </Button>
                    ))}
                  </Stack>

                  <button
                    type="button"
                    className="text-right font-bold"
                    onClick={handleOpenPopover}
                  >
                    more
                  </button>
                  <Popover
                    id={"slider-popover"}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClosePopover}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                  >
                    <Box padding={"10px 20px"} width={"300px"}>
                      <Typography color="text.secondary">
                        <Box
                          component={"span"}
                          fontSize={"40px"}
                          fontWeight={"bold"}
                          mr={"5px"}
                        >
                          {sendUserThanks}
                        </Box>
                        THX
                      </Typography>
                      <Stack
                        direction={"row"}
                        spacing={"10px"}
                        alignItems={"center"}
                      >
                        <Remove color="success" sx={{ fontSize: "30px" }} />
                        <Slider
                          value={sliderValue}
                          onChange={handleChangeSlider}
                          min={0}
                          max={sendUserThanks}
                          step={1}
                          valueLabelDisplay="auto"
                          color="success"
                        />

                        <Add color="success" sx={{ fontSize: "30px" }} />
                      </Stack>
                    </Box>
                  </Popover>
                </Stack>

                <Stack
                  alignItems={"center"}
                  justifyContent={"center"}
                  marginTop={"20px"}
                >
                  <Button
                    variant="contained"
                    onClick={handleSendThanks}
                    disabled={currentThanksValue === null && sliderValue === 0}
                    sx={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  >
                    Thanks!
                  </Button>
                </Stack>
              </>
            ) : (
              <Stack
                alignItems={"center"}
                paddingTop={"50px"}
                paddingBottom={"30px"}
              >
                <Box alignItems={"center"} width={"150px"}>
                  <img src={sentUrl} alt="" />
                </Box>
                <Typography
                  color="secondary.main"
                  fontSize={"40px"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Thanks sent!
                </Typography>
                <Box mt={4}>
                  <Button
                    variant={"outlined"}
                    size={"large"}
                    color="secondary"
                    href={path.get().app.dashboard()}
                  >
                    dashboard
                  </Button>
                </Box>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
