import { Head } from "@/components/seo/head";
import { Swap } from "@/features/app/wallet/crypto-wallet/components/swap";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const SwapRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="Crypto Wallet | Swap" />
      <WalletLayout label="Swap">
        <Swap />
      </WalletLayout>
    </div>
  );
};
