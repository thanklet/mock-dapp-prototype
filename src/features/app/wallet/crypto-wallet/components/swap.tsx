import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { TextFieldPulldown } from "@/components/ui/form/text-field-pulldown";
import { LinkTabs } from "@/components/ui/link-tabs";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Box, Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../../components/thanks-card";
import { WalletEnum, walletOptions } from "../../constants";
import { CardHeader } from "./card-header";
import { tokenOptions } from "./constants";

export const Swap = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const thanks = user?.thanks ?? 0;

  const tabs = [
    {
      label: walletOptions.find(
        (option) => option.value === WalletEnum.APP_WALLET,
      )?.label as string,
      to: path.get().app.wallet.appWallet.transfer,
    },
    {
      label: walletOptions.find(
        (option) => option.value === WalletEnum.CRYPTO_WALLET,
      )?.label as string,
      to: path.get().app.wallet.cryptoWallet.swap,
    },
  ].filter((tab): tab is { label: string; to: string } => !!tab.label);

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
      <div className="flex flex-col gap-y-4 max-w-[500px] w-full">
        <ThanksCard
          backgroundColor="blue"
          thanks={thanks}
          linkButtons={[
            {
              label: "Transfer",
              to: path.get().app.wallet.cryptoWallet.transfer,
            },
            {
              label: "Swap",
              to: path.get().app.wallet.cryptoWallet.swap,
              isCurrentPage: true,
            },
            {
              label: "Exchange",
              to: path.get().app.wallet.cryptoWallet.exchange.digitalGift,
            },
          ]}
          header={<CardHeader />}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <LinkTabs tabs={tabs} value={tabs.at(1)?.to} />
        </Box>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-y-8 px-4"
        >
          <TextFieldPulldown
            label="crypto wallet"
            pulldownProps={{ items: tokenOptions }}
          />
          <TextFieldPulldown
            label="crypto wallet"
            pulldownProps={{ items: tokenOptions }}
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
              Swap
            </Button>
          </div>
        </form>
      </div>
    </Stack>
  );
};
