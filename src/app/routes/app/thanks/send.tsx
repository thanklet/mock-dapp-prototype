import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Send } from "@/features/app/thanks/send/components/send";

export const SendRoute = () => {
  return (
    <>
      <Head title={"送信"} />
      <ThanksLayout label="送信">
        <Send />
      </ThanksLayout>
    </>
  );
};
