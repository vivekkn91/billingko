import React, { useState, useEffect } from "react";
import { ReactComponent as Bell } from "../Icons/Bell.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUserData() {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:3001/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchUserData();
  }, []);
  function openMenu() {
    document.querySelector(".l-navbar").classList.toggle("show");
    console.log("Dadda");
  }
  return (
    <header className="header" id="header">
      <span onClick={openMenu} className="menu">
        <FontAwesomeIcon
          style={{ marginRight: "20px" }}
          icon={faBars}
          className="menu-icon"
        />
      </span>
      <span className="headericon">
        <div className="header_toggle"></div>
        <h6 className="header-text Mulish-Bold black">Billingko</h6>
      </span>
      <div className="headericon alert">
        <div className="left">
          <Bell />
        </div>
        <div className="user-avt"></div>
        <div className="right">
          <span className="font-24 display-block Mulish-Bold black">
            {user && user.name}
          </span>
          <span className="grey">cashier</span>
        </div>
      </div>
    </header>
  );
}
