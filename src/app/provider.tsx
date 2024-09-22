import { ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";
import { HelmetProvider } from "react-helmet-async";

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
      <HelmetProvider>{children}</HelmetProvider>
    </ThemeProvider>
  );
};
