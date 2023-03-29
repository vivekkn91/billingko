import "../App.css";
import Header from "./header";
import Sidebar from "./side";
import { ReactComponent as SEARCH } from "../Icons/SEARCH.svg";
import { ReactComponent as Customer } from "../Icons/filter.svg";
import { ReactComponent as Threedots } from "../Icons/threedots.svg";
import Order from "./order";
import List from "./custumer-list";
import { ListGroup } from "react-bootstrap";

import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function PageTwo() {
  const [id, setId] = useState("");
  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/foodtype/types")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));
  }, []);

  const handleFileChange = (event) => {
    setFiles(event.target.files); // update the files state with the selected files
  };
  const handleSubmit = (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append("name", name);
    data.append("category", category);
    data.append("price", price);
    data.append("description", description);
    data.append("image", files[0]);

    setLoading(true); // show loading indicator

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://localhost:3001/products", data, config)
      .then((response) => {
        setLoading(false); // hide loading indicator
        alert("Product added successfully!");
      })
      .catch((error) => {
        setLoading(false); // hide loading indicator
        alert(error.response.data);
        alert("An error occurred while adding the product.");
      });
  };

  return (
    <div className="App">
      <div id="body-pd">
        <Header />
        <Sidebar />

        <h2 className="Mulish-Bold margin-top-30 ">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="card2 mobile-card">
            <div className="display-block  ">
              <label className="Mulish-Bold black">Id</label> <br />
              <input
                style={styles.right}
                className="mobile-inputs"
                type="text"
                name="id"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="dispaly-flex margin-top-5 avr padding-5">
              <div className="header_toggle3"></div>{" "}
              <div className="display-block  padding-5">
                <span className="Mulish-Bold black ">
                  Select your product picture
                </span>
                <br />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  // style={{ display: "none" }}
                  multiple // ref={hiddenFileInput}
                />
                {/* <button className="BlueButton" onClick={handleClick}>
                  Browse
                </button> */}
              </div>
            </div>

            <div className="display-block margin-top-5">
              <label className="Mulish-Bold black">Prooduct Name </label> <br />
              <input
                style={styles.right}
                className="mobile-inputs"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="display-block margin-top-5">
              <label className="Mulish-Bold black margin-top-5">
                Category{" "}
              </label>{" "}
              <br />
              <select
                name="languages"
                id="lang"
                className="mobile-inputs"
                style={styles.right}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="display-block margin-top-5">
              <label className="Mulish-Bold black">Price </label>
              <br />
              <input
                onChange={(e) => setPrice(e.target.value)}
                style={styles.right}
                className="mobile-inputs"
                type="text"
              />
            </div>
            <div className="display-block margin-top-5">
              <label className="Mulish-Bold black">Description </label>
              <textarea
                onChange={(e) => setDescription(e.target.value)}
                style={styles.text}
                className="mobile-inputs"
              ></textarea>
            </div>
          </div>
          <div style={styles.avr2}>
            <button className="BlueButton">Save</button>{" "}
            <button style={styles.button} className="grey">
              cancel
            </button>
          </div>
        </form>
      </div>
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
