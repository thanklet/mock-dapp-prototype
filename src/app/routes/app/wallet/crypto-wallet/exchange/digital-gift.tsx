import { WalletLayout } from "@/features/app/layouts/wallet-layout";
import { DigitalGift } from "@/features/app/wallet/crypto-wallet/components/exchange/digital-gift";

export const DigitalGiftRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <WalletLayout label="Exchange">
        <DigitalGift />
      </WalletLayout>
    </div>
  );
};
