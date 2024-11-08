import { useUser } from "@/app/providers/user-provider";
import { LinkButton } from "@/components/ui/link-button";
import { useGetUser } from "@/features/profile/api";
import { path } from "@/utils/path";
import { Box, Stack } from "@mui/material";
import { ThanksCard } from "../../components/thanks-card";

export const Buy = () => {
  const { user: authorizedUser } = useUser();
  const { data } = useGetUser({ documentId: authorizedUser.uid });
  const user = data.data();
  const thanks = user?.thanks ?? 0;

  return (
    <Stack
      spacing={"30px"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      rowGap={"64px"}
      alignItems={"center"}
    >
      <ThanksCard
        backgroundColor="green"
        thanks={thanks}
        linkButtons={[
          { label: "Transfer", to: path.get().app.wallet.transfer },
          { label: "Staking", to: path.get().app.wallet.staking },
          { label: "Buy", to: path.get().app.wallet.buy, isCurrentPage: true },
        ]}
      />

      <Box
        sx={{
          display: "flex",
          gap: "32px",
          justifyContent: "center",
        }}
      >
        <LinkButton
          // TODO: リンク先をStripeの購入ページに変更する
          to="#"
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "20px",
          }}
        >
          <span>10THX</span>
          <span>（100円）</span>
        </LinkButton>
        <LinkButton
          // TODO: リンク先をStripeの購入ページに変更する
          to="#"
          type="button"
          variant="contained"
          sx={{
            display: "flex",
            flexDirection: "column",
            lineHeight: "20px",
          }}
        >
          <span>100THX</span>
          <span>（1000円）</span>
        </LinkButton>
      </Box>
    </Stack>
  );
};
