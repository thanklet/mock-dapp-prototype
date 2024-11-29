import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Send } from "@/features/app/thanks/send/components/send";

export const SendRoute = () => {
  return (
    <>
      <Head title={"Send"} />
      <ThanksLayout label="Send">
        <Send />
      </ThanksLayout>
    </>
  );
};
