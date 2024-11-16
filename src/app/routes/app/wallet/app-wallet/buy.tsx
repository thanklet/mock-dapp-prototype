import { Buy } from "@/features/app/wallet/app-wallet/components/buy";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const BuyRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Buy">
        <Buy />
      </WalletLayout>
    </div>
  );
};