import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App";
import Orders from "./components/pageTwo";
import Customers from "./components/pageThree";
import Produts from "./components/pageFour";
import LOgin from "./components/login_dash";
import Register from "./components/resgieterDas";

function Navigator() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LOgin />} />
      </Routes>
      <Routes>
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Routes>
        <Route path="/" element={<App />} />
      </Routes> */}
      <Routes>
        <Route path="/dashbord" element={<App />} />
      </Routes>
      <Routes>
        <Route path="/produts" element={<Produts />} />
      </Routes>
      <Routes>
        <Route path="/orders" element={<Orders />} />
      </Routes>
      <Routes>
        <Route path="/customers" element={<Customers />} />
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
