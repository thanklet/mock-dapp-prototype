import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { TextField } from "../ui/form/text-field";

type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box>
      <Box>
        <TextField label="Search" />
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};
