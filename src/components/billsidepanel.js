import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import { ReactComponent as Seettings } from "../Icons/seettings.svg";

const Side = ({ selectedCategory, onCategorySelect }) => {
  const [categories, setCategories] = useState([]);

  function hideBar() {
    var sidebar = document.querySelector(".l-navbar");
    sidebar.classList.remove("show");
    sidebar.classList.add("hide");
  }

  useEffect(() => {
    fetch("http://localhost:3001/foodtype/types")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleCategorySelect = (category) => {
    onCategorySelect(category);
    hideBar();
  };

  return (
    <div className="l-navbar2 " id="nav-bar">
      <a className="close-icon" href="#" onClick={hideBar}>
        ✖
      </a>
      <nav className="nav item-nav">
        <div className="scroll">
          {console.log(categories)}
          {categories.map((category) => (
            <NavLink
              activeClassName="active3"
              key={category}
              onClick={() => {
                handleCategorySelect(category);
                hideBar();
              }}
            >
              <div>
                <span className="nav_logo2">
                  {category}
                  <i className="fas fa-angry"></i>
                </span>
              </div>
            </NavLink>
          ))}
        </div>
      </nav>
      <NavLink activeClassName="active3" to="/produts">
        <span className="nav_logo2">
          <Seettings />
          <i className="fas fa-angry"></i>{" "}
        </span>
      </NavLink>
    </div>
  );
};

export default Side;
