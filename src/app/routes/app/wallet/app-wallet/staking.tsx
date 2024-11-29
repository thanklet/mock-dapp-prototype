import { Head } from "@/components/seo/head";
import { Staking } from "@/features/app/wallet/app-wallet/components/staking";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const StakingRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="App Wallet | Staking" />
      <WalletLayout label="Staking">
        <Staking />
      </WalletLayout>
    </div>
  );
};
