import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider, createTheme } from "@mui/material";
import type { ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#7367F0",
        light: "#8F85F3",
        dark: "#675DD8",
      },
      secondary: {
        main: "#FF416C",
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
