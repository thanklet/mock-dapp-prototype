import { WalletLayout } from "@/features/app/layouts/wallet-layout";
import { Staking } from "@/features/app/wallet/components/staking";

export const StakingRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Staking">
        <Staking />
      </WalletLayout>
    </div>
  );
};
