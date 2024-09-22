import { ThanksLayout } from "@/components/layouts/thanks-layout";
import { Head } from "@/components/seo/head";
import { Location } from "@/features/app/thanks/location/components/location";
import { useParams } from "react-router-dom";
export const LocationRoute = () => {
  const { userId } = useParams();
  return (
    <>
      <Head title={"ロケーション"} />
      <ThanksLayout backTo={`/app/${userId}/dashboard`} label="ロケーション">
        <Location />
      </ThanksLayout>
    </>
  );
};
