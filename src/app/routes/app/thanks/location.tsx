import { ThanksLayout } from "@/components/layouts/thanks-layout";
import { Head } from "@/components/seo/head";
import { Location } from "@/features/app/thanks/location/components/location";
export const LocationRoute = () => {
  return (
    <>
      <Head title={"ロケーション"} />
      <ThanksLayout label="ロケーション">
        <Location />
      </ThanksLayout>
    </>
  );
};
