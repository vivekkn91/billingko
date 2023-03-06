// export default App;
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/header";
import Sidebar from "./components/side";
import PageOne from "./components/pageOne";
import Cart from "./components/cart";

function App() {
  return (
    <div className="App">
      <div id="body-pd">
        <Header />
        <Sidebar />
        <div className="height-100 bg-light">
          <PageOne />
        </div>
      </div>
    </div>
  );
}

export default App;
