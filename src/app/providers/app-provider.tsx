import { queryClient } from "@/lib/query";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./auth-provider";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7367F0",
      },
      secondary: {
        main: "#F400A2",
      },
      background: {
        default: "#F8F7FA",
      },
      success: {
        main: "#1ADB00",
      },
      error: {
        main: "#E90000",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
    },
    cssVariables: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>{children}</AuthProvider>
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition="bottom-left"
          />
        </QueryClientProvider>
      </HelmetProvider>
    </ThemeProvider>
  );
};
