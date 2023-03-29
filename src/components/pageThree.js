import "../App.css";
import Header from "./header";
import Sidebar from "./side";
import { ReactComponent as SEARCH } from "../Icons/SEARCH.svg";
import { ReactComponent as Customer } from "../Icons/filter.svg";
import { ReactComponent as Threedots } from "../Icons/threedots.svg";
import Order from "./order";
import List from "./custumer-list";
import { ListGroup } from "react-bootstrap";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

function PageTwo() {
  const [newCategory, setNewCategory] = useState("");
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSubmitCategory = (event) => {
    event.preventDefault();

    setLoadingCategory(true); // show loading indicator

    const data = { name: newCategory };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post("http://localhost:3001/addfoodtype/types", data, config)
      .then((response) => {
        setLoadingCategory(false); // hide loading indicator
        alert("Category added successfully!");
        setCategories([...categories, response.data]); // add new category to the existing list
        setNewCategory(""); // clear the input field
      })
      .catch((error) => {
        setLoadingCategory(false); // hide loading indicator
        alert("An error occurred while adding the category.");
        console.error(error);
      });
  };
  return (
    <div className="App">
      <body id="body-pd">
        <Header />
        <Sidebar />

        <div className="card">
          <div className="magin-top-2 gilroy table-bobile">
            {" "}
            <form onSubmit={handleSubmitCategory}>
              <div className="card2 mobile-card">
                <div className="display-block margin-top-5">
                  <label className="Mulish-Bold black">New Category Name</label>{" "}
                  <br />
                  <input
                    style={styles.right}
                    className="mobile-inputs"
                    type="text"
                    name="new-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button className="BlueButton2" disabled={loadingCategory}>
                    {loadingCategory ? "Loading..." : "Add Category"}
                  </button>
                </div>
              </div>
              <div style={styles.avr2}></div>
            </form>
          </div>
        </div>
      </body>
    </div>
  );
}
const styles = {
  right: {
    right: "-25px",
    top: "20px",
  },
  text: {
    height: "200px",
    right: "-25px",
    top: "20px",
  },
  button: {
    background: " #ffffff00",
    border: "none",
    fontSize: "21px",
    position: " relative",
    top: "32px",
    right: "-56px",
  },
  avr2: { marginBottom: "5%" },
};
export default PageTwo;
