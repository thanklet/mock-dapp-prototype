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
import { Add, Remove } from "@mui/icons-material";
import { Box, Stack } from "@mui/material";
import { useState } from "react";

const THANKS = 3;

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

const BUTTON_DATA = [
  {
    value: "1",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "2",
    isSelected: false,
    isDisabled: false,
  },
  {
    value: "5",
    isSelected: false,
    isDisabled: false,
  },
];
export const Send = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<{
    value: string;
    url: string;
  } | null>(null);
  const [thanksButtons, setThanksButtons] = useState<
    {
      value: string;
      isSelected: boolean;
      isDisabled: boolean;
    }[]
  >(
    BUTTON_DATA.map((button) => ({
      ...button,
      isDisabled: button.value > THANKS.toString(),
    })),
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [isSent, setIsSent] = useState(false);

  const handleSelectEmoji = (emoji: { value: string; url: string }) => {
    setSelectedEmoji(emoji);
  };

  const handleSelectThanksButton = (value: string) => {
    setThanksButtons((prev) =>
      prev.map((button) =>
        button.value === value
          ? { ...button, isSelected: true }
          : { ...button, isSelected: false },
      ),
    );
  };

  const handleSendThanks = () => {
    setIsSent(true);
  };

  const [sliderValue, setSliderValue] = useState(0);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

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
          alt="staff1"
          src={staff1Url}
          sx={{
            width: 100,
            height: 100,
            border: "2px solid",
            borderColor: "secondary.main",
          }}
        />
        <Typography variant="h2" fontSize={"26px"}>
          John
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
                {selectedEmoji && (
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
                )}

                <Stack spacing={"5px"}>
                  <Stack direction={"row"} spacing={"15px"}>
                    {thanksButtons.map((button) => (
                      <Button
                        key={button.value}
                        variant={
                          button.isSelected || button.isDisabled
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
                        onClick={() => handleSelectThanksButton(button.value)}
                        disabled={button.isDisabled}
                      >
                        <Box
                          component={"span"}
                          fontSize={"28px"}
                          lineHeight={"1"}
                        >
                          {button.value}
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
                    onClick={handleClick}
                  >
                    more
                  </button>
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
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
                          {sliderValue}
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
                          onChange={handleSliderChange}
                          min={0}
                          max={THANKS}
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
                    disabled={
                      !selectedEmoji ||
                      (!thanksButtons.some((button) => button.isSelected) &&
                        sliderValue === 0)
                    }
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
                <Stack alignItems={"center"} width={"150px"}>
                  <img src={sentUrl} alt="thanks sent" />
                </Stack>
                <Typography
                  color="secondary.main"
                  fontSize={"40px"}
                  fontWeight={"bold"}
                  textAlign={"center"}
                >
                  Thanks sent!
                </Typography>
              </Stack>
            )}
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
};
