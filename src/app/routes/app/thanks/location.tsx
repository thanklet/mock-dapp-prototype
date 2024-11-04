import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Location } from "@/features/app/thanks/location/components/location";
import { path } from "@/utils/path";
import { useParams } from "react-router-dom";
export const LocationRoute = () => {
  const { userId } = useParams();
  const tabs = [
    {
      label: "Map",
      to: path.get().app.userId.thanks.location(userId),
    },
    { label: "Search", to: path.get().app.userId.thanks.search(userId) },
  ];
  return (
    <>
      <Head title={"ロケーション"} />
      <ThanksLayout
        label="ロケーション"
        linkTabsProps={{ tabs, value: tabs[0].to }}
      >
        <Location />
      </ThanksLayout>
    </>
  );
};
