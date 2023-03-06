import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Naviagtion from "./naviagation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Naviagtion />
    </HashRouter>
  </React.StrictMode>
);

reportWebVitals();
