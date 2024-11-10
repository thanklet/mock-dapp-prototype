import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Pulldown } from "@/components/ui/form/pulldown";
import { TextField } from "@/components/ui/form/text-field";
import { LinkTabs } from "@/components/ui/link-tabs";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Box, Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../../components/thanks-card";
import { REGION_OPTIONS } from "../../constants";
import { CardHeader } from "../card-header";

export const DigitalGift = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const thanks = user?.thanks ?? 0;

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    // NOTE: モックなので何もしない
    e.preventDefault();
  };

  return (
    <Stack
      spacing={"30px"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
    >
      <div className="flex flex-col gap-y-8 max-w-[500px] w-full">
        <ThanksCard
          backgroundColor="blue"
          thanks={thanks}
          linkButtons={[
            {
              label: "Transfer",
              to: path.get().app.cryptoWallet.transfer,
            },
            {
              label: "Swap",
              to: path.get().app.cryptoWallet.swap,
            },
            {
              label: "Exchange",
              to: path.get().app.cryptoWallet.exchange.digitalGift,
              isCurrentPage: true,
            },
          ]}
          header={<CardHeader />}
        />

        <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
          <LinkTabs
            tabs={[
              {
                label: "Digital Gift",
                to: path.get().app.cryptoWallet.exchange.digitalGift,
              },
              {
                label: "Token",
                to: path.get().app.cryptoWallet.exchange.token,
              },
            ]}
            value={path.get().app.cryptoWallet.exchange.digitalGift}
          />
        </Box>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
          <Pulldown label="Select region" items={REGION_OPTIONS} />
          <TextField
            label="Estimated price"
            placeholder="SOL 0.00000000"
            disabled
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              sx={{
                display: "flex",
                flexDirection: "column",
                lineHeight: "20px",
                paddingBlock: "16px",
                minWidth: "150px",
                borderRadius: "12px",
              }}
            >
              Buy
            </Button>
          </div>
        </form>
      </div>
    </Stack>
  );
};
