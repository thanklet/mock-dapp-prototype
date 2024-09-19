import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";
import type { ReactNode } from "react";

type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
      }}
    >
      <Box
        maxWidth="1416px"
        margin="0 auto"
        padding="24px"
        display="flex"
        flexDirection="column"
        gap="24px"
      >
        {/* TODO: 検索バーの挙動が未確定なので仮に作っておく */}
        <Box
          display="flex"
          alignItems="center"
          gap="8px"
          color="grey.500"
          fontSize="15px"
          padding="8px 16px"
          borderRadius="8px"
          sx={{
            boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.12)",
            cursor: "pointer",
          }}
        >
          <SearchIcon fontSize="small" />
          Search ⌘K
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
