import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Search } from "@/features/app/thanks/search/components/search";
import { path } from "@/utils/path";

export const SearchRoute = () => {
  const tabs = [
    {
      label: "Map",
      to: path.get().app.thanks.location,
    },
    { label: "Search", to: path.get().app.thanks.search },
  ];
  return (
    <>
      <Head title={"Search"} />
      <ThanksLayout
        label="Search"
        linkTabsProps={{ tabs, value: tabs[1].to }}
        backPath="dashboard"
      >
        <Search />
      </ThanksLayout>
    </>
  );
};
