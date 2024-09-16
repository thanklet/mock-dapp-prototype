import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { TextField } from "../ui/form/text-field";
import { Head } from "../seo/head";

type AdminLayoutProps = {
  children: ReactNode;
  title?: string;
};

export const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <Box>
        <Box>
          <TextField label="Search" />
        </Box>
        <Box>{children}</Box>
      </Box>
    </>
  );
};
