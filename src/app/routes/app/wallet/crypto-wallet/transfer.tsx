import { Transfer } from "@/features/app/wallet/crypto-wallet/components/transfer";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const TransferRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Transfer">
        <Transfer />
      </WalletLayout>
    </div>
  );
};
