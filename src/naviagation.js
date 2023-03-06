import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Orders from "./components/pageTwo";
// import Customers from "./components/pageThree";
import Produts from "./components/pageFour";

function Navigator() {
  return (
    <>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
      <Routes>
        <Route path="/produts" element={<Produts />} />
      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </>
  );
}

function Home() {
  return (
    <div style={{ paddingTop: "20%", textAlign: "center" }}>
      <h1>Home</h1>
    </div>
  );
}

export default Navigator;
