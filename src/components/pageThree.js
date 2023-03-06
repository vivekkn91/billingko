import "../App.css";
import Header from "./header";
import Sidebar from "./side";
import { ReactComponent as SEARCH } from "../Icons/SEARCH.svg";
import { ReactComponent as Customer } from "../Icons/filter.svg";
import { ReactComponent as Threedots } from "../Icons/threedots.svg";
import Order from "./order";
import List from "./custumer-list";
import { ListGroup } from "react-bootstrap";

function pageTwo() {
  return (
    <div className="App">
      <body id="body-pd">
        <Header />
        <Sidebar />

        <div className="card">
          <div className="search-box dispaly-flex">
            <div className="wrapper2  ">
              <SEARCH className="icon6 " />
              <input
                className="input7 background-grey"
                placeholder="Search Here .."
                // onChange={(e) => this.setState({ serchinput: e.target.value })}
                type="Search"
              />
            </div>
            <span className="poston-relative">
              <Customer />
            </span>
            <span className="poston-relative2">
              <Threedots />
            </span>
          </div>
          <div className="magin-top-2 gilroy table-bobile">
            {" "}
            <List />
          </div>
        </div>
      </body>
    </div>
  );
}

export default pageTwo;
