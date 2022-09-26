import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Editor from "./App";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <Editor />
  </StrictMode>
);
