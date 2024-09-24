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
    },
    cssVariables: true,
  });

  return (
    <ThemeProvider theme={theme}>
      <HelmetProvider>{children}</HelmetProvider>
    </ThemeProvider>
  );
};
