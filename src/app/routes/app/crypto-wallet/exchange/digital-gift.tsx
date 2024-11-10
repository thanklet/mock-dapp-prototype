import { DigitalGift } from "@/features/app/crypto-wallet/components/exchange/digital-gift";
import { WalletLayout } from "@/features/app/layouts/wallet-layout";

export const DigitalGiftRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Digital Gift">
        <DigitalGift />
      </WalletLayout>
    </div>
  );
};
