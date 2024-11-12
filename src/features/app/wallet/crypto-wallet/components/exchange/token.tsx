import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form/text-field";
import { TextFieldPulldown } from "@/components/ui/form/text-field-pulldown";
import { LinkTabs } from "@/components/ui/link-tabs";
import { ThanksCard } from "@/features/app/components/thanks-card";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Box, Stack } from "@mui/material";
import type { FormEvent } from "react";
import { CardHeader } from "../card-header";
import { TOKEN_OPTIONS } from "../constants";

export const Token = () => {
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
              to: path.get().app.wallet.cryptoWallet.transfer,
            },
            {
              label: "Swap",
              to: path.get().app.wallet.cryptoWallet.swap,
            },
            {
              label: "Exchange",
              to: path.get().app.wallet.cryptoWallet.exchange.digitalGift,
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
                to: path.get().app.wallet.cryptoWallet.exchange.digitalGift,
              },
              {
                label: "Token",
                to: path.get().app.wallet.cryptoWallet.exchange.token,
              },
            ]}
            value={path.get().app.wallet.cryptoWallet.exchange.token}
          />
        </Box>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-4">
          <TextFieldPulldown
            label="Token"
            pulldownProps={{ items: TOKEN_OPTIONS }}
          />
          <TextField label="Wallet address" />
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
