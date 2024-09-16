import { HelmetProvider } from "react-helmet-async";
import type { ReactNode } from "react";

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return <HelmetProvider>{children}</HelmetProvider>;
};
