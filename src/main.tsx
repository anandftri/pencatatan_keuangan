import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { TransaksiProvider } from "./context/TransaksiContext";
import { ProfilProvider } from "./context/ProfilContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ProfilProvider>
        <TransaksiProvider>
          <App />
        </TransaksiProvider>
      </ProfilProvider>
    </BrowserRouter>
  </StrictMode>,
);
