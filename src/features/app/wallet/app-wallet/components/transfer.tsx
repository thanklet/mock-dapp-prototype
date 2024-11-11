import { useUser } from "@/app/providers/user-provider";
import tokenLogoUrl from "@/assets/token-logo.svg";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form/text-field";
import { LinkTabs } from "@/components/ui/link-tabs";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Box, InputAdornment, Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../../components/thanks-card";
import { WALLET_MAP, WALLET_OPTIONS } from "../../constants";

export const Transfer = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const thanks = user?.thanks ?? 0;

  const tabs = [
    {
      label: WALLET_OPTIONS.find(
        (option) => option.value === WALLET_MAP.APP_WALLET,
      )?.label as string,
      to: path.get().app.wallet.appWallet.transfer,
    },
    {
      label: WALLET_OPTIONS.find(
        (option) => option.value === WALLET_MAP.CRYPTO_WALLET,
      )?.label as string,
      to: path.get().app.wallet.cryptWallet.transfer,
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
          backgroundColor="green"
          thanks={thanks}
          linkButtons={[
            {
              label: "Transfer",
              to: path.get().app.wallet.appWallet.transfer,
              isCurrentPage: true,
            },
            {
              label: "Staking",
              to: path.get().app.wallet.appWallet.staking,
            },
            { label: "Buy", to: path.get().app.wallet.appWallet.buy },
          ]}
        />

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <LinkTabs tabs={tabs} value={tabs.at(0)?.to} />
        </Box>

        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col gap-y-8 px-4"
        >
          <div>
            <div className="font-semibold mb-1">
              {`${WALLET_OPTIONS.find((option) => option.value === WALLET_MAP.APP_WALLET)?.label} > ${WALLET_OPTIONS.find((option) => option.value === WALLET_MAP.CRYPTO_WALLET)?.label}`}
            </div>
            <TextField
              className="w-full"
              placeholder="100"
              endAdornment={
                <InputAdornment position="end">
                  <img src={tokenLogoUrl} alt="" height={24} width={24} />
                </InputAdornment>
              }
            />
          </div>
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
              Transfer
            </Button>
          </div>
        </form>
      </div>
    </Stack>
  );
};
