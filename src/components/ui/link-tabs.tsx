import { Tab, Tabs, type TabsProps } from "@mui/material";
import { forwardRef } from "react";
import { Link } from "react-router-dom";

type LinkTabsProps = TabsProps & {
  tabs: {
    label: string;
    to: string;
  }[];
};

export const LinkTabs = forwardRef<HTMLDivElement, LinkTabsProps>(
  ({ tabs, ...props }, ref) => {
    return (
      <Tabs ref={ref} {...props}>
        {tabs.map((tab) => (
          <Tab
            component={Link}
            key={tab.to}
            to={tab.to}
            label={tab.label}
            value={tab.to}
            sx={{
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
    );
  },
);
