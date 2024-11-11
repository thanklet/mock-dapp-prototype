import { useUser } from "@/app/providers/user-provider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { FormControlLabel } from "@/components/ui/form/form-control-label";
import { TextField } from "@/components/ui/form/text-field";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Stack } from "@mui/material";
import type { FormEvent } from "react";
import { ThanksCard } from "../../../components/thanks-card";

export const Staking = () => {
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
      maxWidth={"500px"}
    >
      <div className="flex flex-col gap-y-16 w-full">
        <ThanksCard
          backgroundColor="green"
          thanks={thanks}
          linkButtons={[
            { label: "Transfer", to: path.get().app.wallet.appWallet.transfer },
            {
              label: "Staking",
              to: path.get().app.wallet.appWallet.staking,
              isCurrentPage: true,
            },
            { label: "Buy", to: path.get().app.wallet.appWallet.buy },
          ]}
        />

        <form onSubmit={handleFormSubmit}>
          <TextField label="Spend" placeholder="100" />
          <dl className="text-[hsla(0,0%,0%,0.48)] mt-2 mb-4 flex gap-x-2">
            <dt className="after:content-[':']">amount</dt>
            <dd>{thanks}thx</dd>
          </dl>
          <Stack
            sx={{
              backgroundColor: "#F5F7FA",
              paddingInline: "34px",
              paddingBlock: "20px",
              borderRadius: "8px",
            }}
          >
            <dl className="flex flex-col gap-y-4">
              <div className="flex justify-between">
                <dt className="text-[hsla(0,0%,0%,0.48)]">Reference APR</dt>
                <dd>4%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[hsla(0,0%,0%,0.48)]">SOL Earnings</dt>
                <dd>0.02THX</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[hsla(0,0%,0%,0.48)]">Deposit</dt>
                <dd>2THX</dd>
              </div>
            </dl>
          </Stack>
          <FormControlLabel
            control={<Checkbox />}
            label="I have read and agree to the Cryptocurrency Mining Agreement"
            className="text-[hsla(0,0%,0%,0.48)] mt-2 mb-8"
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
              Stake
            </Button>
          </div>
        </form>
      </div>
    </Stack>
  );
};
