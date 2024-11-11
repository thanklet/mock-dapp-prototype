import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form/text-field";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../components/thanks-card";
import { WALLET_MAP, WALLET_OPTIONS } from "../constants";

export const Transfer = () => {
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

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-8">
          <div>
            <div className="font-semibold mb-1">
              {`${WALLET_OPTIONS.find((option) => option.value === WALLET_MAP.APP_WALLET)?.label} > ${WALLET_OPTIONS.find((option) => option.value === WALLET_MAP.CRYPTO_WALLET)?.label}`}
            </div>
            <TextField className="w-full" placeholder="100" />
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
