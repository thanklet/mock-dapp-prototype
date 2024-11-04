import { Head } from "@/components/seo/head";
import { ThanksLayout } from "@/features/app/thanks/layouts/thanks-layout";
import { Search } from "@/features/app/thanks/search/components/search";
import { path } from "@/utils/path";
import { useParams } from "react-router-dom";

export const SearchRoute = () => {
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
      <Head title={"Search"} />
      <ThanksLayout label="Search" linkTabsProps={{ tabs, value: tabs[1].to }}>
        <Search />
      </ThanksLayout>
    </>
  );
};
