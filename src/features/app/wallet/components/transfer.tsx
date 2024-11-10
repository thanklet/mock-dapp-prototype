import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form/text-field";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Stack } from "@mui/material";
import { type FormEvent, useState } from "react";
import { ThanksCard } from "../../components/thanks-card";
import { WalletEnum, walletOptions } from "../constants";

export const Transfer = () => {
  const [selectedWallet] = useState<
    (typeof WalletEnum)[keyof typeof WalletEnum]
  >(WalletEnum.APP_WALLET);
  const selectedWalletLabel = walletOptions.find(
    (wallet) => wallet.value === selectedWallet,
  )?.label;
  const otherWalletLabel = walletOptions.find(
    (wallet) =>
      wallet.value ===
      (selectedWallet === WalletEnum.APP_WALLET
        ? WalletEnum.APP_WALLET
        : WalletEnum.CRYPTO_WALLET),
  )?.label;

  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const thanks = user?.thanks ?? 0;

  const handleFormSubmit = (e: FormEvent<HTMLButtonElement>) => {
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
      <div className="flex flex-col gap-y-16 max-w-[500px] w-full">
        <ThanksCard
          backgroundColor="green"
          thanks={thanks}
          linkButtons={[
            {
              label: "Transfer",
              to: path.get().app.wallet.transfer,
              isCurrentPage: true,
            },
            {
              label: "Staking",
              to: path.get().app.wallet.staking,
            },
            { label: "Buy", to: path.get().app.wallet.buy },
          ]}
        />

        {/* TODO: タブリンクを表示する */}

        <form className="flex flex-col gap-y-8">
          <div>
            {/* TODO: 選択中の wallet に応じて、表示を切り替る。 */}
            <div className="font-semibold mb-1">
              {`${selectedWalletLabel} > ${otherWalletLabel}`}
            </div>
            <TextField className="w-full" placeholder="100" />
          </div>
          <div className="flex justify-center">
            <Button
              type="submit"
              variant="contained"
              onSubmit={handleFormSubmit}
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
