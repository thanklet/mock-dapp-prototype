import CssBaseline from "@mui/material/CssBaseline";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);
