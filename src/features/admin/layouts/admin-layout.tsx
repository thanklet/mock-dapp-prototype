import staff1Url from "@/assets/dummy/1.png";
import { UserDropdown } from "@/components/ui/user-dropdown";
import { Box } from "@mui/material";
import type { ReactNode } from "react";
type AdminLayoutProps = {
  children: ReactNode;
};

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          <Box ml="auto">
            <UserDropdown
              user={{
                name: "John Doe",
                email: "john.doe@example.com",
                image: staff1Url,
              }}
            />
          </Box>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
};
