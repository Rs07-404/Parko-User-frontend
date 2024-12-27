import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext.tsx";
// import { SocketContextProvider } from "./context/SocketContext.tsx";
import { AppContextProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        {/* <SocketContextProvider> */}
        <AppContextProvider>
          <App />
        </AppContextProvider>
        {/* </SocketContextProvider> */}
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);
