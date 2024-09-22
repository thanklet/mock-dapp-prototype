import { ThanksLayout } from "@/components/layouts/thanks-layout";
import { Head } from "@/components/seo/head";
import { Send } from "@/features/app/thanks/send/components/send";
import { useParams } from "react-router-dom";
export const SendRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={"送信"} />
      <ThanksLayout backTo={`/app/${userId}/thanks/location`} label="送信">
        <Send />
      </ThanksLayout>
    </>
  );
};
