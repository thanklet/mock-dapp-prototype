import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
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
