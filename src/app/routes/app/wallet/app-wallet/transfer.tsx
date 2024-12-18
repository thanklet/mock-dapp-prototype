import { Head } from "@/components/seo/head";
import { Transfer } from "@/features/app/wallet/app-wallet/components/transfer";
import { WalletLayout } from "@/features/app/wallet/layouts/wallet-layout";

export const TransferRoute = () => {
  return (
    <div className="flex flex-col gap-y-5 items-center pt-[30px] px-5">
      <Head title="App Wallet | Transfer" />
      <WalletLayout label="Transfer">
        <Transfer />
      </WalletLayout>
    </div>
  );
};
