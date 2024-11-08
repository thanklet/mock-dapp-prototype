import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Location } from "@/features/app/thanks/location/components/location";
import { path } from "@/utils/path";

export const LocationRoute = () => {
  const tabs = [
    {
      label: "Map",
      to: path.get().app.thanks.location,
    },
    { label: "Search", to: path.get().app.thanks.search },
  ];
  return (
    <>
      <Head title={"Location"} />
      <ThanksLayout
        label="Location"
        linkTabsProps={{ tabs, value: tabs[0].to }}
      >
        <Location />
      </ThanksLayout>
    </>
  );
};
