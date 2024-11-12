import { WalletLayout } from "@/features/app/layouts/wallet-layout";
import { Complete } from "@/features/app/wallet/crypto-wallet/components/exchange/complete";

export const CompleteRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Exchange">
        <Complete />
      </WalletLayout>
    </div>
  );
};
