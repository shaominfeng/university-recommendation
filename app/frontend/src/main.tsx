import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ConfigProvider } from "antd";
import "@ant-design/v5-patch-for-react-19";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={{ cssVar: true }}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </StrictMode>,
);
