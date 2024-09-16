import { App } from "./app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CssBaseline from "@mui/material/CssBaseline";

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <CssBaseline />
    <App />
  </StrictMode>,
);
