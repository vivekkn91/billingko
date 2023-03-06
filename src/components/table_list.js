import React from "react";
import ReactDOM from "react-dom";

import Tabs from "./tabs";
import Panel from "./panel";
import axios from "axios";

import { useState, useEffect } from "react";

import { events } from "./data";

// import "./styles.css";

const myInfluencers = [33, 81];

const userId = 4;

export default function Lsir() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await axios.get("http://localhost:3001/inventories");
        console.log(response.data);
        setItems(response.data);
        // setItems(response.data);
      } catch (error) {
        setError(error);
      }
    }

    fetchItems();
  }, []);

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <>
      <Tabs>
        <Panel title="All">
          <div className="margin-two font-24 Mulish-Bold black">Food</div>

          <div className="dispaly-flex box-cover ">
            {items.map((item) => (
              <div className="box">
                <div className="Inner-box">
                  <img
                    src="http://localhost:3001/images/back7.jpg"
                    alt="Product image"
                  />
                </div>
                <span style={styles.black}>{item.item}</span> <br />
                <span style={styles.green}>${item.price}</span>
              </div>
            ))}
          </div>
          <div className="margin-two font-24 Mulish-Bold black"> Drinks</div>

          <div className="dispaly-flex box-cover">
            <div className="box">
              <div className="Inner-box"></div>
              <span style={styles.black}>sashimi</span> <br />
              <span style={styles.green}>$22</span>
            </div>
            <div className="box">
              <div className="Inner-box"></div>
              <span style={styles.black}>sashimi</span> <br />
              <span style={styles.green}>$22</span>
            </div>
            <div className="box">
              <div className="Inner-box"></div>
              <span style={styles.black}>sashimi</span> <br />
              <span style={styles.green}>$22</span>
            </div>
          </div>
        </Panel>
        <Panel title="Food">
          {/* {events
          .filter((event) => event.host_id !== userId)
          .map((event) => {
            return <div key={event.id}>{event.title}</div>;
          })} */}
        </Panel>
        <Panel title="Snanks">
          {/* <div>Food</div> */}
          {/* {events
          .filter((event) => event.host_id !== userId)
          .map((event) => {
            return <div key={event.id}>{event.title}</div>;
          })} */}
        </Panel>
        <Panel title="Drinks">
          {/* {events
          .filter((event) => myInfluencers.includes(event.host_id))
          .map((event) => {
            return <div key={event.id}>{event.title}</div>;
          })} */}
        </Panel>
        <Panel title="Package">
          {/* {events.map((event) => {
          return <div key={event.id}>{event.title}</div>;
        })} */}
        </Panel>
      </Tabs>
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
