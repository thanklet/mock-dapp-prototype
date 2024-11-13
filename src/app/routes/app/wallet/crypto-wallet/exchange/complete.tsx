import { Complete } from "@/features/app/wallet/crypto-wallet/components/exchange/complete";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const CompleteRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Exchange">
        <Complete />
      </WalletLayout>
    </div>
  );
};
