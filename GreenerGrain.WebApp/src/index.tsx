import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./appConfigs/index.css";
import reportWebVitals from "./appConfigs/reportWebVitals";

const container = document.getElementById("root");

if (container !== null) {
  const root = createRoot(container);
  root.render(<App />);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
