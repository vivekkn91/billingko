import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";
import { ReactComponent as Coupon } from "../Icons/Coupon.svg";
import { ReactComponent as YourSvg2 } from "../Icons/filter.svg";
import { ReactComponent as Filter } from "../Icons/customer.svg";
import { ReactComponent as Customer } from "../Icons/filter.svg";

import { ReactComponent as Bell } from "../Icons/Bell.svg";
import { ReactComponent as Orders } from "../Icons/orders.svg";
import { ReactComponent as Package } from "../Icons/Package.svg";
import { ReactComponent as Pen } from "../Icons/pen.svg";
import { ReactComponent as plus } from "../Icons/plus.svg";
import forur from "../Icons/four.png";
import { ReactComponent as Seettings } from "../Icons/seettings.svg";
import { ReactComponent as YourSvg } from "../Icons/user.svg";
export class side extends Component {
  render() {
    function hideBar() {
      var sidebar = document.querySelector(".l-navbar");
      sidebar.classList.remove("show");
      sidebar.classList.add("hide");
    }
    return (
      <div className="l-navbar " id="nav-bar">
        <a class="close-icon" href="#" onClick={hideBar}>
          &#10006;
        </a>
        <nav className="nav">
          {/* {this.props.siderbarcolor ? ( */}
          <NavLink
            className={({ isActive }) => {
              const linkClasses = ["navcolor"];
              if (isActive) linkClasses.push("active");

              return linkClasses.join(" "); // returns "registerButton" or "registerButton active"
            }}
            activeClassName="active3"
            // className="porpssidebar"
            // exact={true}
            to="/dashbord"
          >
            <div>
              <a href="#" className="nav_logo">
                <img className="slogo" src={forur} />
                <i className="fas fa-angry"></i>{" "}
              </a>
            </div>
          </NavLink>
          {/* // ) : ( */}
          <NavLink activeClassName="active3" exact={true} to="/orders">
            <div>
              {" "}
              <a href="#" className="nav_logo">
                <Orders />
                <i className="fas fa-angry"></i>{" "}
              </a>
            </div>
          </NavLink>
          <NavLink to="/customers" activeClassName="active3">
            <div>
              {" "}
              <a href="#" className="nav_logo">
                <Filter />
                <i className="fas fa-angry"></i>{" "}
              </a>
            </div>
          </NavLink>
          <NavLink to="/produts" activeClassName="active3">
            {" "}
            <div>
              <a className="nav_logo">
                <Package />
                <i className="fas fa-angry"></i>{" "}
              </a>
            </div>{" "}
          </NavLink>
          {/* <div>
            {" "}
            <a href="#" className="nav_logo">
              <Coupon />
              <i className="fas fa-angry"></i>{" "}
            </a>
          </div>{" "}
          <div>
            {" "}
            <a href="#" className="nav_logo">
              <YourSvg />
              <i className="fas fa-angry"></i>{" "}
            </a>
          </div>{" "} */}
          {/* <div>
            {" "}
            <a href="#" className="nav_logo">
              <Seettings />
              <i className="fas fa-angry"></i>{" "}
            </a>
          </div> */}
        </nav>
      </div>
    );
  }
}

export default side;
