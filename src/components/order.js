import React from "react";
import { ReactComponent as Bell } from "../Icons/Bell.svg";
import List from "./list";
import SoldList from "./soildlsit";
export default function order() {
  return (
    <>
      {/* <div className="dispaly-flex  margin-top box-cover Mulish-Bold mobile-block">
        <div className="scard dispaly-flex scardin mobile-margin ">
          <div>
            <span>Customer</span>
            <br />
            <span>1000</span>
          </div>
          <div className="red">
            <span> &#8595;</span>
            <br />
            <span>-15%</span>
          </div>
        </div>
        <div className="scard dispaly-flex scardin mobile-margin">
          <div>
            <span>Orders</span>
            <br />
            <span>1050</span>
          </div>
          <div className="green">
            <span> &#8593;</span>
            <br />
            <span>+20%</span>
          </div>
        </div>
        <div className="scard dispaly-flex scardin mobile-margin">
          <div>
            <span>Revenue</span>
            <br />
            <span>$50.000</span>
          </div>
          <div className="green">
            <span> &#8593;</span>
            <br />
            <span>10%</span>
          </div>
        </div>
        <div className="scard dispaly-flex scardin mobile-margin">
          <div>
            <span>Nett Profit</span>
            <br />
            <span>$12.000</span>
          </div>
          <div className="green">
            <span> &#8593;</span>
            <br />
            <span>+12%</span>
          </div>
        </div>
      </div> */}
      <div className=" scardin gilroy mobile-block ">
        <div className="leftbox margin-top border-radius">
          <span className="margin-two margin-top-5  Mulish-Bold black">
            Last
          </span>
          <br />
          <span className="margin-two  Mulish-Bold black ">Order</span>

          <List />
        </div>
        {/* <div className="Rightbox margin-top border-radius gilroy">
          <SoldList />
        </div> */}
      </div>
    </>
  );
}
