import "../App.css";
import Header from "./header";
import Sidebar from "./side";
import Order from "./order";
import PageOne from "./pageOne";

function pageTwo() {
  return (
    <div className="App">
      <body id="body-pd">
        <Header />
        <Sidebar />
        <div className="height-100 bg-light">
          <Order />
        </div>
      </body>
    </div>
  );
}

export default pageTwo;
