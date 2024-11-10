import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { TextField } from "@/components/ui/form/text-field";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../../components/thanks-card";

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
      <div className="flex flex-col gap-y-16 max-w-[500px] w-full">
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
        />

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-8">
          <div>
            <TextField
              label="Estimated price"
              placeholder="SOL 0.00000000"
              disabled
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
              Buy
            </Button>
          </div>
        </form>
      </div>
    </Stack>
  );
};
