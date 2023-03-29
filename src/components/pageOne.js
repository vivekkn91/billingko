import React from "react";
import { ReactComponent as SEARCH } from "../Icons/SEARCH.svg";

import axios from "axios";
import Tabs from "./tabs";
const { BrowserWindow } = require("electron");
import SendIcon from "@mui/icons-material/Send";
import Panel from "./panel";
// import Cart from "./cart";

import Button from "@mui/material/Button";

import { useState, useEffect } from "react";

export default function PageOne({ selectedCategory }) {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [trayItems, settrayItems] = useState([]);
  const [lastbill, setLastBill] = useState(0);

  useEffect(() => {
    async function fetchItems() {
      try {
        let response;
        if (selectedCategory) {
          response = await axios.get(
            `http://localhost:3001/categories/${selectedCategory}`
          );
        } else {
          response = await axios.get("http://localhost:3001/inventories");
        }
        console.log(response.data);
        setItems(response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchItems();
  }, [selectedCategory]);
  console.log(trayItems);
  const handleCheckClick = (item) => {
    // check if the item already exists in trayItems
    const exists = trayItems.some(
      (trayItem) => trayItem.user_id === item.user_id
    );

    if (exists) {
      // if the item already exists, update its quantity
      settrayItems(
        trayItems.map((trayItem) =>
          trayItem.user_id === item.user_id
            ? { ...trayItem, qty: trayItem.qty + 1 }
            : trayItem
        )
      );
    } else {
      // if the item doesn't exist, add it to trayItems with quantity 1
      settrayItems([...trayItems, { ...item, qty: 1 }]);
    }
  };

  const addToCart = (item) => {
    const cartItem = { ...item, qty: 1 }; // include qty property
    setCartItems([...cartItems, cartItem]);
  };

  const incre = (idd) => {
    settrayItems(
      trayItems.map((stat) =>
        stat.user_id === idd ? { ...stat, qty: stat.qty + 1 } : stat
      )
    );
  };

  const handleTotal = () => {
    // reduce will add all of your price and set a default value in case the items is empty
    return trayItems.reduce(
      (acc, curr) => Number(acc) + curr.qty * Number(curr.price),
      0
    );
  };

  // const handleBill = () => {
  //   const billTotal = handleTotal();
  //   console.log(billTotal);

  //   const currentDate = new Date().toISOString().slice(0, 10);
  //   const currentTime = new Date().toLocaleTimeString();

  //   const data = {
  //     billTotal: billTotal,
  //     date: currentDate,
  //     time: currentTime,
  //   };

  //   axios
  //     .post("/billreport", data)
  //     .then((response) => {
  //       console.log(response.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const decre = (idd) => {
    settrayItems(
      trayItems.map((stat) =>
        stat.user_id === idd
          ? {
              ...stat,
              qty: stat.qty !== 1 ? stat.qty - 1 : (stat.qty = 0),
            }
          : stat
      )
    );
  };

  if (error) {
    return <div>{error.message}</div>;
  }
  function Tray({ trayItems }) {
    const [billReport, setBillReport] = useState(null);

    useEffect(() => {
      axios
        .get("http://localhost:3001/billreport/today")
        .then((response) => {
          setBillReport(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    const handleBill = () => {
      const billTotal = handleTotal();
      console.log(billTotal);

      const currentDate = new Date().toISOString().slice(0, 10);
      const currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });

      const data = {
        billTotal: billTotal,
        date: currentDate,
        time: currentTime,
      };

      // Get the tray items data and calculate the total amount
      // const trayItems = trayItems;

      // Render or print the bill HTML code as needed

      console.log(trayItems);
      // Generate bill HTML
      // Generate bill HTML
      let billHtml = `
  <div style="font-family: Arial, sans-serif; font-size: 14px; width: 80%; margin: 0 auto;">
    <div style="text-align: center;">
      <img src="https://example.com/logo.png" alt="Restaurant Logo" style="height: 80px;">
      <h2 style="text-align: center;">Restaurant Name</h2>
      <p style="margin: 0;">Phone: 123-456-7890</p>
      <p style="margin: 0;">Address: 123 Main St, Anytown, USA</p>
      <p style="margin: 0;">GST Number: 123456789012345</p>
      <hr style="border: 1px solid black; margin: 10px 0;">
    </div>
    <h3 style="text-align: center;">Bill Report</h3>
`;
      let totalAmount = 0;
      trayItems.forEach((item) => {
        const subtotal = item.qty * item.price;
        totalAmount += subtotal;
        const itemName =
          item.item.length > 10
            ? `${item.item.slice(0, 10)}<br>${item.item.slice(10)}`
            : item.item;
        billHtml += `
    <p style="border-bottom: 1px solid black; padding: 5px 0;">
      <span style="display: inline-block; width: 70%; word-break: break-word;" class="item-name">${itemName}</span>
      <span style="display: inline-block; width: 15%; text-align: right;"> &#x20B9;${subtotal}</span>
      <span style="display: inline-block; width: 15%; text-align: right;">${item.qty}</span>
    </p>
  `;
      });
      billHtml += `
    <p style="text-align: right; margin-top: 10px;">Total: &#x20B9;${totalAmount}</p>
    <div style="text-align: center;">
      <p>Thank you for your visit! Please come again.</p>
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Thanks%20for%20visiting%20us." alt="QR Code">
    </div>
  </div>
`;

      console.log(trayItems);
      console.log(billHtml);

      axios
        .post("http://localhost:3001/billreport", data)
        .then((response) => {
          const billWindow = window.open(
            "",
            "Bill Report",
            "width=800,height=600"
          );
          billWindow.document.body.innerHTML = billHtml;
          billWindow.print();
          // console.log(response.data);
          // alert("Success! Your bill report has been submitted.");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    };

    return (
      <>
        <div>
          <h1>Food Cart</h1>
          {console.log(billReport)}
          <div className="reportToday">
            {" "}
            <h3> Total sales today {billReport && billReport.billCount}</h3>
            <h3> Total Amount today {billReport && billReport.totalAmount}</h3>
          </div>

          <></>
          <div className="tray-container">
            <table className="tray">
              <thead>
                <tr>
                  <th className="item-name">Item</th>
                  <th className="item-price">Price</th>
                  <th className="item-price">Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {trayItems &&
                  trayItems.map((ele, index) => {
                    if (ele.qty > 0) {
                      return (
                        <tr key={index}>
                          <td>{ele.item}</td>
                          <td>{ele.price}</td>
                          <td className="item-qty">
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => incre(ele.user_id)}
                            >
                              +
                            </Button>
                            {ele.qty}
                            <Button
                              variant="contained"
                              size="small"
                              onClick={() => decre(ele.user_id)}
                            >
                              -
                            </Button>
                          </td>
                          <td>{ele.qty * ele.price}</td>
                        </tr>
                      );
                    }
                  })}
              </tbody>
            </table>
          </div>
          <div>
            {" "}
            <h3>
              {`Total Amount  ${handleTotal()}`}&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                onClick={() => {
                  handleBill();
                }}
                variant="contained"
                size="medium"
                endIcon={<SendIcon />}
              >
                {" "}
                Print Bill
              </Button>
            </h3>{" "}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="card">
        <div className="search-box">
          <div className="wrapper ">
            <SEARCH className="icon6 " />

            <input
              className="input6 background-grey"
              placeholder="Search Here .."
              // onChange={(e) => this.setState({ serchinput: e.target.value })}
              type="Search"
            />
          </div>
        </div>
        <>
          <Tabs>
            <Panel title="All">
              {/* <img src="images/back7.jpg" /> */}
              <div className="margin-two font-24 Mulish-Bold black">
                {selectedCategory}
              </div>

              <div className="dispaly-flex box-cover ">
                {items.map((item) => (
                  <div className="box" onClick={() => handleCheckClick(item)}>
                    <div className="Inner-box">
                      <img src={item.imageUrl} alt="Product Image" />

                      {/* <img src={item.imageUrl} /> */}
                    </div>
                    <span style={styles.black}>{item.item}</span> <br />
                    <span style={styles.green}>${item.price}</span>
                  </div>
                ))}
              </div>
            </Panel>
            <Panel title="Food"></Panel>
            {/* <Panel title="Food"></Panel>
            <Panel title="Snanks"></Panel>
            <Panel title="Drinks"></Panel>
            <Panel title="Package"></Panel> */}
          </Tabs>
        </>
        <div className="cart-container">
          <Tray trayItems={trayItems} />
        </div>
      </div>
    </>
  );
}

const styles = {
  green: { position: "relative", top: "10%", color: "#42bda1", right: "-4%" },
  black: {
    position: "relative",
    top: "10%",
    right: "-4%",
    fontSize: "18px",
    color: "#11142d",
  },
};
